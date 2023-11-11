import { addServerImportsDir, addServerPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';
import { defu } from 'defu';

import type { ModuleOptions, RequiredModuleOptions } from './types';

export type { H3EventContextSession } from './types/session';

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
			if (moduleOptions.storage.secret.length !== 32) throw new Error('The secret length must be 32!');
		} else if (moduleOptions.storage.keyLength < 12) throw new Error('The storage key length must be 12 or more!');
		nuxt.options.runtimeConfig.nuxtSession = moduleOptions;
		const resolver = createResolver(import.meta.url);
		addServerImportsDir(resolver.resolve('./runtime/server/utils'));
		addServerPlugin(resolver.resolve('./runtime/server/plugins/session'));
		logger.success('Nuxt session initialization successful.');
	}
});
