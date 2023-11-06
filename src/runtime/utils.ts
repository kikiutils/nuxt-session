import { nanoid } from 'nanoid';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import fsLiteDriver from 'unstorage/drivers/fs-lite';
import lruCacheDriver from 'unstorage/drivers/lru-cache';
import memoryDriver from 'unstorage/drivers/memory';
import redisDriver from 'unstorage/drivers/redis';
import type { Storage, StorageValue } from 'unstorage';

import type { UseStorageModuleOptions } from '../types';

export const generateUniqueSessionStorageKey = async (storageOptions: Required<Required<UseStorageModuleOptions>['storage']>, storage: Storage<StorageValue>) => {
	let key: string;
	do key = `${storageOptions.keyPrefix}_${nanoid(storageOptions.keyLength)}`;
	while (await storage.hasItem(key));
	return key;
};

export const getStorage = (moduleOptions: UseStorageModuleOptions) => {
	if (!moduleOptions.storage || moduleOptions.storage?.driver === 'memory') return createStorage({ driver: memoryDriver() });
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
