import crypto from 'crypto';
import { H3Event, setCookie } from 'h3';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import fsLiteDriver from 'unstorage/drivers/fs-lite';
import lruCacheDriver from 'unstorage/drivers/lru-cache';
import memoryDriver from 'unstorage/drivers/memory';
import redisDriver from 'unstorage/drivers/redis';
import type { EventHandlerRequest } from 'h3';
import type { StorageValue } from 'unstorage';

import type { PartialH3EventContextSession, RequiredModuleOptions } from '../types';

interface StorageSessionWithCreatedTime {
	createdAt: number;
	data: PartialH3EventContextSession;
}

export const createSessionCipherFunctions = (secretKey: string) => {
	if (secretKey.length !== 32) throw new Error('The secret length must be 32!');
	const algorithm = 'aes-256-cbc';
	const key = Buffer.from(secretKey, 'utf-8');
	const decryptSession = (encryptedSession: string) => {
		const textParts = encryptedSession.split(':');
		if (textParts.length === 1) return;
		try {
			const iv = Buffer.from(textParts.shift()!, 'hex');
			const decipher = crypto.createDecipheriv(algorithm, key, iv);
			return JSON.parse(`${decipher.update(textParts.join(':'), 'hex', 'utf8')}${decipher.final('utf8')}`) as PartialH3EventContextSession;
		} catch (error) {}
	};

	const encryptSession = (session: PartialH3EventContextSession) => {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		try {
			return `${iv.toString('hex')}:${cipher.update(JSON.stringify(session), 'utf8', 'hex')}${cipher.final('hex')}`;
		} catch (error) {}
	};

	return {
		decryptSession,
		encryptSession
	};
};

export const createSessionStorageFunctions = (moduleOptions: RequiredModuleOptions.UseUnstorage) => {
	const keyPrefix = moduleOptions.storage.keyPrefix;
	const maxAgeMs = moduleOptions.maxAge * 1000;
	const storage = getStorage<StorageSessionWithCreatedTime>(moduleOptions);
	const readSessionFromStorage = async (sessionStorageKey: string) => {
		const itemKey = `${keyPrefix}_${sessionStorageKey}`;
		const sessionWithCreatedTime = await storage.getItem(itemKey);
		if (sessionWithCreatedTime === null) return;
		if (sessionWithCreatedTime.createdAt + maxAgeMs >= Date.now()) return sessionWithCreatedTime.data;
		await storage.removeItem(itemKey);
	};

	const writeSessionToStorage = async (sessionStorageKey: string, session: PartialH3EventContextSession) => {
		await storage.setItem(`${keyPrefix}_${sessionStorageKey}`, {
			createdAt: Date.now(),
			data: session
		});
	};

	return {
		readSessionFromStorage,
		writeSessionToStorage
	};
};

export const createSetCookieFunction = (moduleOptions: RequiredModuleOptions) => {
	return (event: H3Event<EventHandlerRequest>, value: string) => {
		const cookieOptions = {
			...moduleOptions.cookie,
			maxAge: moduleOptions.maxAge
		};

		return setCookie(event, moduleOptions.cookie.name, value, cookieOptions);
	};
};

const getStorage = <T extends StorageValue>(moduleOptions: RequiredModuleOptions.UseUnstorage) => {
	if (moduleOptions.storage.driver === 'memory') return createStorage<T>({ driver: memoryDriver() });
	const drivers = {
		'fs-lite': fsLiteDriver,
		'lru-cache': lruCacheDriver,
		fs: fsDriver,
		redis: redisDriver
	} as const;

	return createStorage<T>({
		// @ts-ignore
		driver: drivers[moduleOptions.storage.driver]({ ...moduleOptions.storage.options })
	});
};
