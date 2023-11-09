import { H3Event } from 'h3';
import onChange from 'on-change';

import { setupH3EventContextSession } from '../utils';

export const clearH3EventContextSession = async (event: H3Event) => {
	event.context.sessionChanged = event.context.sessionCleared = true;
	onChange.unsubscribe(event.context.session);
	setupH3EventContextSession(event, {}, (event) => delete event.context.sessionCleared);
};
