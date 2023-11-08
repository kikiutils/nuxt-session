import crypto from 'crypto';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import fsLiteDriver from 'unstorage/drivers/fs-lite';
import lruCacheDriver from 'unstorage/drivers/lru-cache';
import memoryDriver from 'unstorage/drivers/memory';
import redisDriver from 'unstorage/drivers/redis';

import type { PartialH3EventContextSession, RequiredModuleOptions } from '../types';

export const createSessionCipherFunctions = (secretKey: string) => {
	if (secretKey.length !== 32) throw new Error('The secret length must be 32!');
	const algorithm = 'aes-256-cbc';
	const key = Buffer.from(secretKey, 'utf-8');
	const ivLength = 16;
	const decryptSession = (encryptedSession: string): PartialH3EventContextSession | undefined => {
		const textParts = encryptedSession.split(':');
		if (textParts.length === 1) return;
		try {
			const iv = Buffer.from(textParts.shift()!, 'hex');
			const decipher = crypto.createDecipheriv(algorithm, key, iv);
			return JSON.parse(`${decipher.update(textParts.join(':'), 'hex', 'utf8')}${decipher.final('utf8')}`);
		} catch (error) {}
	};

	const encryptSession = (sessionData: PartialH3EventContextSession) => {
		const iv = crypto.randomBytes(ivLength);
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		try {
			return `${iv.toString('hex')}:${cipher.update(JSON.stringify(sessionData), 'utf8', 'hex')}${cipher.final('hex')}`;
		} catch (error) {}
	};

	return {
		decryptSession,
		encryptSession
	};
};

export const createSessionStorageFunctions = (moduleOptions: RequiredModuleOptions.UseUnstorage) => {
	const keyPrefix = moduleOptions.storage.keyPrefix;
	const storage = getStorage(moduleOptions);
	const readSessionData = async (sessionStorageKey: string) => {
		const sessionStorageData = await storage.getItem<PartialH3EventContextSession>(`${keyPrefix}_${sessionStorageKey}`);
		return sessionStorageData || undefined;
	};

	const writeSessionData = async (sessionStorageKey: string, sessionData: PartialH3EventContextSession) => {
		await storage.setItem<PartialH3EventContextSession>(`${keyPrefix}_${sessionStorageKey}`, sessionData);
	};

	return {
		readSessionData,
		writeSessionData
	};
};

const getStorage = (moduleOptions: RequiredModuleOptions.UseUnstorage) => {
	if (moduleOptions.storage.driver === 'memory') return createStorage({ driver: memoryDriver() });
	const drivers = {
		'fs-lite': fsLiteDriver,
		'lru-cache': lruCacheDriver,
		fs: fsDriver,
		redis: redisDriver
	} as const;

	return createStorage({
		// @ts-ignore
		driver: drivers[moduleOptions.storage.driver]({ ...moduleOptions.storage.options })
	});
};
