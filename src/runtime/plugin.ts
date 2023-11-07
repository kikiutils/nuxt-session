import { useRuntimeConfig } from '#imports';
import { useLogger } from '@nuxt/kit';
import onChange from 'on-change';
import { deleteCookie, getCookie, setCookie } from 'h3';
import type { NitroApp } from 'nitropack';

import { createSessionCipherFunctions, generateUniqueSessionStorageKey, getStorage } from './utils';
import type { PartialH3EventContextSession, RequiredModuleOptions } from '../types';

const logger = useLogger();

function setupUseCookieStorageHooks(moduleOpions: RequiredModuleOptions.UseCookieStorage, nitroApp: NitroApp) {
	logger.info(`Use cookie to store the session.`);
	const { decryptSession, encryptSession } = createSessionCipherFunctions(moduleOpions.storage.secret);
	nitroApp.hooks.hook('beforeResponse', (event) => {
		if (!event.context.sessionChanged || !event.path.startsWith('/api')) return;
		const encryptedSession = encryptSession(event.context.session);
		if (encryptedSession !== undefined) setCookie(event, moduleOpions.cookie.name, encryptedSession, moduleOpions.cookie);
	});

	nitroApp.hooks.hook('request', (event) => {
		if (!event.path.startsWith('/api')) return;
		const encryptedSession = getCookie(event, moduleOpions.cookie.name);
		let sessionData: PartialH3EventContextSession = {};
		if (encryptedSession) {
			const decryptedSessionData = decryptSession(encryptedSession);
			if (decryptedSessionData === undefined) deleteCookie(event, moduleOpions.cookie.name);
			else sessionData = decryptedSessionData;
		}

		event.context.session = onChange(sessionData, () => {
			event.context.sessionChanged = true;
			onChange.unsubscribe(event.context.session);
		});
	});
}

function setupUseUnstorageHooks(moduleOpions: RequiredModuleOptions.UseUnstorage, nitroApp: NitroApp) {
	logger.info(`Use unjs/unstorage with the driver "${moduleOpions.storage.driver}" to store the session.`);
	if (moduleOpions.storage.keyLength < 12) throw new Error('The storage key length must be 12 or more!');
	const storage = getStorage(moduleOpions);
	nitroApp.hooks.hook('beforeResponse', async (event) => {
		if (!event.context.sessionChanged || !event.path.startsWith('/api')) return;
		const sessionStorageKey = event.context.sessionStorageKey || (await generateUniqueSessionStorageKey(moduleOpions.storage, storage));
		await storage.setItem(sessionStorageKey, event.context.session, { ttl: moduleOpions.cookie.maxAge });
		setCookie(event, moduleOpions.cookie.name, sessionStorageKey, moduleOpions.cookie);
	});

	nitroApp.hooks.hook('request', async (event) => {
		if (!event.path.startsWith('/api')) return;
		const sessionStorageKey = getCookie(event, moduleOpions.cookie.name);
		let sessionData: PartialH3EventContextSession = {};
		if (sessionStorageKey) {
			const sessionStorageData = await storage.getItem<PartialH3EventContextSession>(sessionStorageKey);
			if (sessionStorageData === null) deleteCookie(event, moduleOpions.cookie.name);
			else {
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
	logger.info('Initializing the Nuxt session...');
	const runtimeConfig = useRuntimeConfig();
	if (runtimeConfig.nuxtSession.storage.driver === 'cookie') setupUseCookieStorageHooks(runtimeConfig.nuxtSession as RequiredModuleOptions.UseCookieStorage, nitroApp);
	else setupUseUnstorageHooks(runtimeConfig.nuxtSession as RequiredModuleOptions.UseUnstorage, nitroApp);
	logger.success('Nuxt session initialized successfully.');
};
