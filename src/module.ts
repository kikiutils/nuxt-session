import { addServerPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';

import type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
	defaults: {
		cookie: {
			httpOnly: true,
			maxAge: 86400,
			name: 'session',
			path: '/',
			sameSite: 'strict',
			secure: true
		},
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
		nuxt.options.runtimeConfig.nuxtSession = defu<ModuleOptions, ModuleOptions[]>(nuxt.options.runtimeConfig.nuxtSession, options);
		addServerPlugin(resolver.resolve('./runtime/plugin'));
	}
});
