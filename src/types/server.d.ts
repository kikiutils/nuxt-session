import type { RequiredModuleOptions } from './options';

interface H3EventContextSession {}
export type PartialH3EventContextSession = Partial<H3EventContextSession>;

declare module '@nuxt/schema' {
	interface RuntimeConfig {
		nuxtSession: RequiredModuleOptions;
	}
}

declare module 'h3' {
	interface H3EventContext {
		session: PartialH3EventContextSession;
		sessionChanged?: true;
		sessionStorageKey?: string;
	}
}
