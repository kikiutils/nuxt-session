import type { RequiredModuleOptions } from './options';

declare module 'nuxt/schema' {
	interface RuntimeConfig {
		nuxtSession: RequiredModuleOptions;
	}
}
