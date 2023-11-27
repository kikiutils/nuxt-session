import { deleteCookie, getCookie } from 'h3';
import { nanoid } from 'nanoid';
import type { NitroApp } from 'nitropack';

import { useRuntimeConfig } from '#imports';
import { changedSymbol, clearedSymbol, storageKeySymbol } from '../../symbols';
import { createSessionCipherFunctions, createSessionStorageFunctions, createSetCookieFunction, setupH3EventContextSession } from '../../utils';
import type { PartialH3EventContextSession, RequiredModuleOptions } from '../../../types';

function setupUseCookieStorageHooks(moduleOptions: RequiredModuleOptions.UseCookieStorage, nitroApp: NitroApp) {
	const { decryptSession, encryptSession } = createSessionCipherFunctions(moduleOptions.storage.options);
	const setCookie = createSetCookieFunction(moduleOptions);
	nitroApp.hooks.hook('beforeResponse', (event) => {
		if (!event.context.session[changedSymbol] || !event.path.startsWith('/api')) return;
		if (event.context.session[clearedSymbol]) return deleteCookie(event, moduleOptions.cookie.name);
		const encryptedSession = encryptSession(event.context.session);
		if (encryptedSession !== undefined) setCookie(event, encryptedSession);
	});

	nitroApp.hooks.hook('request', (event) => {
		if (!event.path.startsWith('/api')) return;
		const encryptedSession = getCookie(event, moduleOptions.cookie.name);
		let session: PartialH3EventContextSession = {};
		if (encryptedSession) {
			const decryptedSession = decryptSession(encryptedSession);
			if (!decryptedSession) deleteCookie(event, moduleOptions.cookie.name);
			else session = decryptedSession;
		}

		setupH3EventContextSession(event, session);
	});
}

function setupUseUnstorageHooks(moduleOptions: RequiredModuleOptions.UseUnstorage, nitroApp: NitroApp) {
	const { readSessionFromStorage, removeStorageSession, writeSessionToStorage } = createSessionStorageFunctions(moduleOptions);
	const setCookie = createSetCookieFunction(moduleOptions);
	nitroApp.hooks.hook('beforeResponse', async (event) => {
		if (!event.context.session[changedSymbol] || !event.path.startsWith('/api')) return;
		if (event.context.session[clearedSymbol]) {
			if (!event.context.session[storageKeySymbol]) return;
			await removeStorageSession(event.context.session[storageKeySymbol]);
			return deleteCookie(event, moduleOptions.cookie.name);
		}

		const sessionStorageKey = event.context.session[storageKeySymbol] || nanoid(moduleOptions.storage.keyLength);
		await writeSessionToStorage(sessionStorageKey, event.context.session);
		setCookie(event, sessionStorageKey);
	});

	nitroApp.hooks.hook('request', async (event) => {
		if (!event.path.startsWith('/api')) return;
		const sessionStorageKey = getCookie(event, moduleOptions.cookie.name);
		let session: PartialH3EventContextSession = {};
		if (sessionStorageKey) {
			const storedSession = await readSessionFromStorage(sessionStorageKey);
			if (!storedSession) deleteCookie(event, moduleOptions.cookie.name);
			else {
				session = storedSession;
				session[storageKeySymbol] = sessionStorageKey;
			}
		}

		setupH3EventContextSession(event, session);
	});
}

export default (nitroApp: NitroApp) => {
	const runtimeConfig = useRuntimeConfig();
	if (runtimeConfig.nuxtSession.storage.driver === 'cookie') setupUseCookieStorageHooks(runtimeConfig.nuxtSession as RequiredModuleOptions.UseCookieStorage, nitroApp);
	else setupUseUnstorageHooks(runtimeConfig.nuxtSession as RequiredModuleOptions.UseUnstorage, nitroApp);
};
