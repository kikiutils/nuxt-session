import type { AESCipherEncodingOptions } from 'node-ciphers';
import type { RequiredDeep } from 'type-fest';
import type { FSStorageOptions } from 'unstorage/drivers/fs';
import type { FSStorageOptions as FSLiteStorageOptions } from 'unstorage/drivers/fs-lite';
import type { LRUDriverOptions } from 'unstorage/drivers/lru-cache';
import type { RedisOptions } from 'unstorage/drivers/redis';

type SessionStorageOptions = SessionStorageOptions.Cookie | ((SessionStorageOptions.Fs | SessionStorageOptions.FsLite | SessionStorageOptions.LruCache | SessionStorageOptions.Memory | SessionStorageOptions.Redis) & UseUnstorageSessionStorageOptions);
export type RequiredModuleOptions = RequiredDeep<ModuleOptions>;

export interface CookieStorageOptions {
	/**
	 * Codec settings for encoding strings into buffers or decoding buffers into strings.
	 *
	 * Adjusting this setting arbitrarily may result in failure to encrypt or decrypt data properly.
	 *
	 * @default
	 *
	 * {
	 *   decryptInput: 'base64',
	 *   decryptOutput: 'utf8',
	 *   encryptInput: 'utf8',
	 *   encryptOutput: 'base64',
	 *   key: 'utf8',
	 *   iv: 'base64'
	 * }
	 */
	encodingOptions?: AESCipherEncodingOptions;

	/**
	 * AES encryption mode used.
	 *
	 * ECB mode is not allowed due to security reasons.
	 *
	 * @default 'ctr'
	 */
	encryptionMode?: 'cbc' | 'cfb' | 'cfb1' | 'cfb8' | 'ctr' | 'ofb';

	/**
	 * The key used for encryption, length must be one of 16, 24 or 32.
	 *
	 * The length of the key is determined by the `encodingOptions.key` setting
	 * (default value is utf8) through the Buffer.from converted byteLength.
	 *
	 * The key should not be leaked to the front-end or elsewhere, it is recommended to use the env setting.
	 */
	key: string;
}

export interface ModuleOptions {
	cookie?: {
		/**
		 * @default true
		 */
		httpOnly?: boolean;

		/**
		 * @default 'session'
		 */
		name?: string;

		/**
		 * @default '/'
		 */
		path?: string;

		/**
		 * @default 'strict'
		 */
		sameSite?: 'lax' | 'none' | 'strict';

		/**
		 * @default true
		 */
		secure?: boolean;
	};

	/**
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Session expiration time in seconds.
	 *
	 * It also sets the cookie expiration time.
	 *
	 * @default 86400
	 */
	maxAge?: number;

	/**
	 * Storage session data options.
	 *
	 * @default { driver: 'memory' }
	 */
	storage?: SessionStorageOptions;
}

export interface UseCookieStorageModuleOptions extends ModuleOptions {
	storage: SessionStorageOptions.Cookie;
}

export interface UseUnstorageModuleOptions extends ModuleOptions {
	storage: Exclude<SessionStorageOptions, SessionStorageOptions.Cookie>;
}

interface UseUnstorageSessionStorageOptions {
	/**
	 * Set the length of the session storage key (excluding the prefix).
	 *
	 * This value should not be set to less than 16, otherwise it is easy for an attacker to brute-force it.
	 *
	 * @default 16
	 */
	keyLength?: number;

	/**
	 * Set the prefix of the session storage key.
	 *
	 * @default 'session'
	 */
	keyPrefix?: string;
}

export namespace RequiredModuleOptions {
	type UseCookieStorage = RequiredDeep<UseCookieStorageModuleOptions>;
	type UseUnstorage = RequiredDeep<UseUnstorageModuleOptions>;
}

namespace SessionStorageOptions {
	interface Cookie {
		driver: 'cookie';
		options: CookieStorageOptions;
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
