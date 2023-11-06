import type { FSStorageOptions } from 'unstorage/drivers/fs';
import type { FSStorageOptions as FSLiteStorageOptions } from 'unstorage/drivers/fs-lite';
import type { LRUDriverOptions } from 'unstorage/drivers/lru-cache';
import type { RedisOptions } from 'unstorage/drivers/redis';

export type ModuleOptions = UseCookieStorageModuleOptions | UseStorageModuleOptions;

type SessionStorageOptions = (SessionStorageOptions.Fs | SessionStorageOptions.FsLite | SessionStorageOptions.LruCache | SessionStorageOptions.Memory | SessionStorageOptions.Redis) & BaseSessionStorageOptions;

interface BaseModuleOptions {
	cookie?: {
		/**
		 * @default true
		 */
		httpOnly?: boolean;

		/**
		 * @default 86400
		 */
		maxAge?: number;

		/**
		 * @default 'session'
		 */
		name?: string;

		/**
		 * @default /
		 */
		path?: string;

		/**
		 * @default strict
		 */
		sameSite?: 'lax' | 'none' | 'strict';

		/**
		 * @default true
		 */
		secure?: boolean;
	};
}

interface BaseSessionStorageOptions {
	/**
	 * Storage key length without prefix.
	 *
	 * @default 16
	 */
	keyLength?: number;

	/**
	 * Storage key prefix.
	 *
	 * @default 'session'
	 */
	keyPrefix?: string;
}

export interface UseCookieStorageModuleOptions extends BaseModuleOptions {
	secret: string;
	storage: 'cookie';
}

export interface UseStorageModuleOptions extends BaseModuleOptions {
	/**
	 * @default { driver: 'memory' }
	 */
	storage?: SessionStorageOptions;
}

namespace SessionStorageOptions {
	interface Fs {
		driver: 'fs';
		options?: FSStorageOptions;
	}

	interface FsLite {
		driver: 'fs-lite';
		options?: FSLiteStorageOptions;
	}

	interface LruCache {
		driver: 'lru-cache';
		options?: LRUDriverOptions;
	}

	interface Memory {
		driver: 'memory';
	}

	interface Redis {
		driver: 'redis';
		options?: RedisOptions;
	}
}
