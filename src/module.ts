import { addServerImports, addServerPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { defu } from 'defu';

import type { ModuleOptions, RequiredModuleOptions } from './types';

export type { H3EventContextSession } from './types/session';

const availableAESModes = [
	'cbc',
	'cfb',
	'cfb1',
	'cfb8',
	'ctr',
	'ofb'
] as const;

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
			if (!availableAESModes.includes(moduleOptions.storage.options.encryptionMode)) throw new Error(`Invalid encryption mode: ${moduleOptions.storage.options.encryptionMode}`);
			//prettier-ignore
			if (![16, 24, 32].includes(moduleOptions.storage.options.key.length)) throw new Error(`Invalid cookie secret key length`);
		} else if (moduleOptions.storage.keyLength < 12) throw new Error('The storage key length must be 12 or more!');
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
