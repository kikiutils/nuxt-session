export interface H3EventContextSession {}

declare module 'h3' {
	interface H3EventContext {
		session: H3EventContextSession;
		sessionChanged?: true;
		sessionStorageKey?: string;
	}
}
