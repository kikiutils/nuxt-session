import { addServerImports, addServerPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { defu } from 'defu';

import type { CookieStorageOptions, ModuleOptions, RequiredModuleOptions } from './types';

export type { H3EventContextSession } from './types/session';

const availableAESModes = [
	'cbc',
	'cfb',
	'cfb1',
	'cfb8',
	'ctr',
	'ofb'
] as const;

const defaultCookieStorageOptions: Omit<CookieStorageOptions, 'key'> = {
	encodingOptions: {
		decryptInput: 'base64',
		encryptOutput: 'base64',
		iv: 'base64'
	},
	encryptionMode: 'ctr'
};

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		cookie: {
			httpOnly: true,
			name: 'session',
			path: '/',
			sameSite: 'strict',
			secure: true
		},
		enabled: true,
		maxAge: 86400,
		storage: {
			driver: 'memory',
			keyLength: 16,
			keyPrefix: 'session'
		}
	},
	meta: {
		configKey: 'nuxtSession',
		name: '@kikiutils/nuxt-session'
	},
	setup(options, nuxt) {
		const logger = useLogger();
		if (!options.enabled) return logger.info('Nuxt session disabled.');
		logger.info('Initializing Nuxt session...');
		const moduleOptions = defu<RequiredModuleOptions, ModuleOptions[]>(nuxt.options.runtimeConfig.nuxtSession, options);
		logger.info(`Nuxt session configured with '${moduleOptions.storage.driver}' driver.`);
		if (moduleOptions.storage.driver === 'cookie') {
			moduleOptions.storage.options = defu(moduleOptions.storage.options, defaultCookieStorageOptions);
			if (!availableAESModes.includes(moduleOptions.storage.options.encryptionMode)) throw new Error(`Invalid encryption mode: ${moduleOptions.storage.options.encryptionMode}`);
			// prettier-ignore
			if (![16, 24, 32].includes(Buffer.from(moduleOptions.storage.options.key, moduleOptions.storage.options.encodingOptions.key).byteLength)) throw new Error(`Invalid cookie secret key length`);
		} else if (moduleOptions.storage.keyLength < 16) throw new Error('The storage key length must be 16 or more');
		nuxt.options.runtimeConfig.nuxtSession = moduleOptions;
		const resolver = createResolver(import.meta.url);
		const sessionUtilsFilePath = resolver.resolve('./runtime/server/utils/session');
		addServerImports([
			{ from: sessionUtilsFilePath, name: 'clearH3EventContextSession' },
			{ from: sessionUtilsFilePath, name: 'popH3EventContextSession' }
		]);

		addServerPlugin(resolver.resolve('./runtime/server/plugins/session'));
		logger.success('Nuxt session initialization successful.');
	}
});
