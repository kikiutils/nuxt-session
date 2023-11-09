import { addServerImportsDir, addServerPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';

import type { ModuleOptions, RequiredModuleOptions } from './types';

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
		const resolver = createResolver(import.meta.url);
		nuxt.options.runtimeConfig.nuxtSession = defu<RequiredModuleOptions, ModuleOptions[]>(nuxt.options.runtimeConfig.nuxtSession, options);
		addServerImportsDir(resolver.resolve('./runtime/composables'));
		addServerPlugin(resolver.resolve('./runtime/plugin'));
	}
});
