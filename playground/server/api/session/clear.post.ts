import { clearH3EventContextSession, defineEventHandler } from '#imports';

export default defineEventHandler((event) => {
	clearH3EventContextSession(event);
	return event.context.session;
});
