import type { FSStorageOptions } from 'unstorage/drivers/fs';
import type { FSStorageOptions as FSLiteStorageOptions } from 'unstorage/drivers/fs-lite';
import type { LRUDriverOptions } from 'unstorage/drivers/lru-cache';
import type { RedisOptions } from 'unstorage/drivers/redis';

type SessionStorageOptions = SessionStorageOptions.Cookie | ((SessionStorageOptions.Fs | SessionStorageOptions.FsLite | SessionStorageOptions.LruCache | SessionStorageOptions.Memory | SessionStorageOptions.Redis) & UseUnstorageSessionStorageOptions);

export interface ModuleOptions {
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

	/**
	 * @default { driver: 'memory' }
	 */
	storage?: SessionStorageOptions;
}

interface UseUnstorageSessionStorageOptions {
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

namespace SessionStorageOptions {
	interface Cookie {
		driver: 'cookie';
		secret: string;
	}

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
