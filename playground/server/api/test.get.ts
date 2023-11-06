import { defineEventHandler } from '#imports';

export default defineEventHandler((event) => {
	return event.context.session;
});
