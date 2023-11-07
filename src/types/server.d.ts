import type { ModuleOptions } from './options';

export interface H3EventContextSession {}

declare module '@nuxt/schema' {
	interface RuntimeConfig {
		nuxtSession: Required<ModuleOptions>;
	}
}

declare module 'h3' {
	interface H3EventContext {
		session: Partial<H3EventContextSession>;
		sessionChanged?: true;
		sessionStorageKey?: string;
	}
}
