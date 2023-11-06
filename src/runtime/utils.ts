import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import fsLiteDriver from 'unstorage/drivers/fs-lite';
import lruCacheDriver from 'unstorage/drivers/lru-cache';
import memoryDriver from 'unstorage/drivers/memory';
import redisDriver from 'unstorage/drivers/redis';

import type { UseStorageModuleOptions } from '../types';

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
		driver: drivers[moduleOptions.storage.driver](moduleOptions.storage.options)
	});
};
