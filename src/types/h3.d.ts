import { PartialH3EventContextSession } from './session';

declare module 'h3' {
	interface H3EventContext {
		session: PartialH3EventContextSession;
		sessionChanged?: true;
		sessionCleared?: true;
		sessionStorageKey?: string;
	}
}
