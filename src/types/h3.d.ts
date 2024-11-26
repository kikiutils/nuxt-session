import type { PartialH3EventContextSession } from '@kikiutils/nitro-session/types/session';

declare module 'h3' {
    interface H3EventContext {
        session: PartialH3EventContextSession;
    }
}
