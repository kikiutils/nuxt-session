import { H3Event } from 'h3';
import onChange from 'on-change';

import { changedSymbol, clearedSymbol, storageKeySymbol } from '../../symbols';
import { setupH3EventContextSession } from '../../utils';
import type { PartialH3EventContextSession } from '../../../types';

/**
 * Clears the session.
 *
 * The cookie will be deleted if no new value is set after clearing.
 *
 * @example
 *
 * export default defineEventHandler((event) => {
 *   clearH3EventContextSession(event);
 *   // Remaining operations...
 *   return 'success';
 * });
 */
export const clearH3EventContextSession = (event: H3Event) => {
	onChange.unsubscribe(event.context.session);
	setupH3EventContextSession(
		event,
		{
			[changedSymbol]: true,
			[clearedSymbol]: true,
			[storageKeySymbol]: event.context.session[storageKeySymbol]
		},
		(event) => delete event.context.session[clearedSymbol]
	);
};

/**
 * Removes a key-value pair from the session and returns the value.
 *
 * @example

 * export default defineEventHandler((event) => {
 *   const code = popH3EventContextSession(event, 'code');
 *   // Remaining operations...
 *   return 'success';
 * });
 */
export const popH3EventContextSession = <K extends keyof PartialH3EventContextSession>(event: H3Event, key: K) => {
	const value = event.context.session[key];
	delete event.context.session[key];
	return value;
};
