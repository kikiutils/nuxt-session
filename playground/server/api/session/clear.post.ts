import { defineEventHandler, clearH3EventContextSession } from '#imports';

export default defineEventHandler((event) => {
	clearH3EventContextSession(event);
	return event.context.session;
});
