import crypto from 'crypto';
import { H3Event, setCookie } from 'h3';
import onChange from 'on-change';
import { createStorage, prefixStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import fsLiteDriver from 'unstorage/drivers/fs-lite';
import lruCacheDriver from 'unstorage/drivers/lru-cache';
import memoryDriver from 'unstorage/drivers/memory';
import redisDriver from 'unstorage/drivers/redis';
import type { StorageValue } from 'unstorage';

import type { PartialH3EventContextSession, RequiredModuleOptions } from '../types';
import { changedSymbol } from './symbols';

interface StorageSessionWithCreatedTime {
	c: number;
	d: PartialH3EventContextSession;
}

export const createSessionCipherFunctions = (secretKey: string) => {
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
	const maxAgeMs = moduleOptions.maxAge * 1000;
	const storage = prefixStorage(getStorage<StorageSessionWithCreatedTime>(moduleOptions), moduleOptions.storage.keyPrefix);
	const readSessionFromStorage = async (sessionStorageKey: string) => {
		const sessionWithCreatedTime = await storage.getItem(sessionStorageKey);
		if (!sessionWithCreatedTime) return;
		if (sessionWithCreatedTime.c + maxAgeMs >= Date.now()) return sessionWithCreatedTime.d;
		await storage.removeItem(sessionStorageKey);
	};

	const removeStorageSession = async (sessionStorageKey: string) => storage.removeItem(sessionStorageKey);
	const writeSessionToStorage = async (sessionStorageKey: string, session: PartialH3EventContextSession) => {
		await storage.setItem(sessionStorageKey, {
			c: Date.now(),
			d: session
		});
	};

	return {
		readSessionFromStorage,
		removeStorageSession,
		writeSessionToStorage
	};
};

export const createSetCookieFunction = (moduleOptions: RequiredModuleOptions) => {
	return (event: H3Event, value: string) => {
		const cookieOptions = {
			...moduleOptions.cookie,
			maxAge: moduleOptions.maxAge
		};

		return setCookie(event, moduleOptions.cookie.name, value, cookieOptions);
	};
};

export const setupH3EventContextSession = (event: H3Event, session: PartialH3EventContextSession, onChangeCallback?: (event: H3Event) => void) => {
	event.context.session = onChange(
		session,
		() => {
			event.context.session[changedSymbol] = true;
			onChangeCallback?.(event);
			onChange.unsubscribe(event.context.session);
		},
		{ ignoreSymbols: true }
	);
};

function getStorage<T extends StorageValue>({ storage }: RequiredModuleOptions.UseUnstorage) {
	if (storage.driver === 'memory') return createStorage<T>({ driver: memoryDriver() });
	const drivers = {
		'fs-lite': fsLiteDriver,
		'lru-cache': lruCacheDriver,
		fs: fsDriver,
		redis: redisDriver
	};

	// @ts-ignore
	return createStorage<T>({ driver: drivers[storage.driver]({ ...storage.options }) });
}
