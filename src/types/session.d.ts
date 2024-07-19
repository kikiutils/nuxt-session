type _H3EventContextSession = H3EventContextSession;

export interface H3EventContextSession {}

declare module '@kikiutils/nitro-session/types/session' {
	interface H3EventContextSession extends _H3EventContextSession {}
}
