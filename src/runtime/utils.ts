import { H3Event, setCookie } from 'h3';
import { AESCipher } from 'node-ciphers';
import onChange from 'on-change';
import { createStorage, prefixStorage } from 'unstorage';
import type { StorageValue } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import fsLiteDriver from 'unstorage/drivers/fs-lite';
import lruCacheDriver from 'unstorage/drivers/lru-cache';
import memoryDriver from 'unstorage/drivers/memory';
import redisDriver from 'unstorage/drivers/redis';

import { changedSymbol } from './symbols';
import type { CookieStorageOptions, PartialH3EventContextSession, RequiredModuleOptions } from '../types';

type StorageSessionWithCreatedTime = [number, PartialH3EventContextSession];

export const createSessionCipherFunctions = (options: CookieStorageOptions) => {
	const aesModeToCipherClassMap = {
		cbc: AESCipher.CBC,
		cfb: AESCipher.CFB,
		cfb1: AESCipher.CFB1,
		cfb8: AESCipher.CFB8,
		ctr: AESCipher.CTR,
		ofb: AESCipher.OFB
	};

	const cipher = new aesModeToCipherClassMap[options.encryptionMode || 'ctr'](options.key, options.encodingOptions);
	const decryptSession = (encryptedSession: string) => {
		const textParts = encryptedSession.split(':');
		if (textParts.length === 1) return;
		const iv = textParts.pop()!;
		return cipher.decryptToJSON<PartialH3EventContextSession>(textParts.join(':'), iv);
	};

	const encryptSession = (session: PartialH3EventContextSession) => {
		const encryptResult = cipher.encryptJSON(session);
		if (!encryptResult) return;
		return `${encryptResult.data}:${encryptResult.iv}`;
	};

	return { decryptSession, encryptSession };
};

export const createSessionStorageFunctions = (moduleOptions: RequiredModuleOptions.UseUnstorage) => {
	const maxAgeMs = moduleOptions.maxAge * 1000;
	const storage = getStorage<StorageSessionWithCreatedTime>(moduleOptions);
	const readSessionFromStorage = async (sessionStorageKey: string) => {
		const sessionWithCreatedTime = await storage.getItem(sessionStorageKey);
		if (!sessionWithCreatedTime) return;
		if (sessionWithCreatedTime[0] + maxAgeMs >= Date.now()) return sessionWithCreatedTime[1];
		await storage.removeItem(sessionStorageKey);
	};

	const removeStorageSession = async (sessionStorageKey: string) => storage.removeItem(sessionStorageKey);
	const writeSessionToStorage = async (sessionStorageKey: string, session: PartialH3EventContextSession) => await storage.setItem(sessionStorageKey, [Date.now(), session]);
	return { readSessionFromStorage, removeStorageSession, writeSessionToStorage };
};

export const createSetCookieFunction = (moduleOptions: RequiredModuleOptions) => {
	const cookieOptions = { ...moduleOptions.cookie, maxAge: moduleOptions.maxAge };
	return (event: H3Event, value: string) => setCookie(event, moduleOptions.cookie.name, value, cookieOptions);
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
	return prefixStorage(createStorage<T>({ driver: drivers[storage.driver]({ ...storage.options }) }), storage.keyPrefix);
}
