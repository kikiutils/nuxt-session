import type { FSStorageOptions } from 'unstorage/drivers/fs';
import type { FSStorageOptions as FSLiteStorageOptions } from 'unstorage/drivers/fs-lite';
import type { LRUDriverOptions } from 'unstorage/drivers/lru-cache';
import type { RedisOptions } from 'unstorage/drivers/redis';

export type ModuleOptions = UseCookieStorageModuleOptions | UseStorageModuleOptions;

type SessionStorageOptions = (
	| {
			driver: 'fs';
			options?: FSStorageOptions;
	  }
	| {
			driver: 'fs-lite';
			options?: FSLiteStorageOptions;
	  }
	| {
			driver: 'lru-cache';
			options?: LRUDriverOptions;
	  }
	| {
			driver: 'memory';
	  }
	| {
			driver: 'redis';
			options?: RedisOptions;
	  }
) & {
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
};

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
