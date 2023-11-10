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
		logger.info('Initializing Nuxt session...');
		const resolver = createResolver(import.meta.url);
		nuxt.options.runtimeConfig.nuxtSession = defu<RequiredModuleOptions, ModuleOptions[]>(nuxt.options.runtimeConfig.nuxtSession, options);
		logger.info(`Nuxt session configured with '${nuxt.options.runtimeConfig.nuxtSession.storage.driver}' driver.`);
		addServerImportsDir(resolver.resolve('./runtime/server/utils'));
		addServerPlugin(resolver.resolve('./runtime/server/plugins/session'));
		logger.success('Nuxt session initialization successful.');
	}
});
