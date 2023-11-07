import type { RequiredModuleOptions } from './options';

export interface H3EventContextSession {}

declare module '@nuxt/schema' {
	interface RuntimeConfig {
		nuxtSession: RequiredModuleOptions;
	}
}

declare module 'h3' {
	interface H3EventContext {
		session: Partial<H3EventContextSession>;
		sessionChanged?: true;
		sessionStorageKey?: string;
	}
}
