import { useRuntimeConfig } from '#imports';
import onChange from 'on-change';
import { getCookie, setCookie } from 'h3';
import type { NitroApp } from 'nitropack';

import { generateUniqueSessionStorageKey, getStorage } from './utils';
import type { H3EventContextSession, UseStorageModuleOptions } from '../types';

// function setupUseCookieStorageHooks(moduleOpions: Required<UseCookieStorageModuleOptions>, nitroApp: NitroApp) {}

function setupUseStorageHooks(moduleOpions: Required<UseStorageModuleOptions>, nitroApp: NitroApp) {
	const storage = getStorage(moduleOpions);

	nitroApp.hooks.hook('beforeResponse', async (event) => {
		if (!event.context.sessionChanged) return;
		let sessionStorageKey = event.context.sessionStorageKey;
		if (!sessionStorageKey) sessionStorageKey = await generateUniqueSessionStorageKey(moduleOpions.storage as Required<Required<UseStorageModuleOptions>['storage']>, storage);
		await storage.setItem(sessionStorageKey, event.context.session, { ttl: moduleOpions.cookie.maxAge });
		setCookie(event, moduleOpions.cookie.name!, sessionStorageKey, moduleOpions.cookie);
	});

	nitroApp.hooks.hook('request', async (event) => {
		if (!event.path.startsWith('/api')) return;
		const sessionStorageKey = getCookie(event, moduleOpions.cookie.name || '');
		let sessionData: Partial<H3EventContextSession> = {};
		if (sessionStorageKey) {
			const sessionStorageData = await storage.getItem<H3EventContextSession>(sessionStorageKey);
			if (sessionStorageData) {
				event.context.sessionStorageKey = sessionStorageKey;
				sessionData = sessionStorageData;
			}
		}

		event.context.session = onChange(sessionData, () => {
			event.context.sessionChanged = true;
			onChange.unsubscribe(event.context.session);
		});
	});
}

export default (nitroApp: NitroApp) => {
	const runtimeConfig = useRuntimeConfig();
	if (runtimeConfig.nuxtSession.storage === 'cookie') return;
	// if (runtimeConfig.nuxtSession.storage === 'cookie') return setupUseCookieStorageHooks(runtimeConfig.nuxtSession, nitroApp);
	setupUseStorageHooks(runtimeConfig.nuxtSession, nitroApp);
};
