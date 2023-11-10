import { H3Event } from 'h3';
import onChange from 'on-change';

import { changedSymbol, clearedSymbol, storageKeySymbol } from '../../symbols';
import { setupH3EventContextSession } from '../../utils';

export const clearH3EventContextSession = async (event: H3Event) => {
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
