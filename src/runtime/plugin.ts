import { useLogger } from '@nuxt/kit';
import { deleteCookie, getCookie } from 'h3';
import { nanoid } from 'nanoid';
import onChange from 'on-change';
import type { NitroApp } from 'nitropack';

import { useRuntimeConfig } from '#imports';
import { createSessionCipherFunctions, createSessionStorageFunctions, createSetCookieFunction } from './utils';
import type { PartialH3EventContextSession, RequiredModuleOptions } from '../types';

const logger = useLogger();

function setupUseCookieStorageHooks(moduleOptions: RequiredModuleOptions.UseCookieStorage, nitroApp: NitroApp) {
	logger.info(`Use cookie to store the session.`);
	const { decryptSession, encryptSession } = createSessionCipherFunctions(moduleOptions.storage.secret);
	const setCookie = createSetCookieFunction(moduleOptions);
	nitroApp.hooks.hook('beforeResponse', (event) => {
		if (!event.context.sessionChanged || !event.path.startsWith('/api')) return;
		const encryptedSession = encryptSession(event.context.session);
		if (encryptedSession !== undefined) setCookie(event, encryptedSession);
	});

	nitroApp.hooks.hook('request', (event) => {
		if (!event.path.startsWith('/api')) return;
		const encryptedSession = getCookie(event, moduleOptions.cookie.name);
		let session: PartialH3EventContextSession = {};
		if (encryptedSession) {
			const decryptedSession = decryptSession(encryptedSession);
			if (decryptedSession === undefined) deleteCookie(event, moduleOptions.cookie.name);
			else session = decryptedSession;
		}

		event.context.session = onChange(session, () => {
			event.context.sessionChanged = true;
			onChange.unsubscribe(event.context.session);
		});
	});
}

function setupUseUnstorageHooks(moduleOptions: RequiredModuleOptions.UseUnstorage, nitroApp: NitroApp) {
	logger.info(`Use unjs/unstorage with the driver "${moduleOptions.storage.driver}" to store the session.`);
	if (moduleOptions.storage.keyLength < 12) throw new Error('The storage key length must be 12 or more!');
	const { readSessionFromStorage, writeSessionToStorage } = createSessionStorageFunctions(moduleOptions);
	const setCookie = createSetCookieFunction(moduleOptions);
	nitroApp.hooks.hook('beforeResponse', async (event) => {
		if (!event.context.sessionChanged || !event.path.startsWith('/api')) return;
		const sessionStorageKey = event.context.sessionStorageKey || nanoid(moduleOptions.storage.keyLength);
		await writeSessionToStorage(sessionStorageKey, event.context.session);
		setCookie(event, sessionStorageKey);
	});

	nitroApp.hooks.hook('request', async (event) => {
		if (!event.path.startsWith('/api')) return;
		const sessionStorageKey = getCookie(event, moduleOptions.cookie.name);
		let session: PartialH3EventContextSession = {};
		if (sessionStorageKey) {
			const storedSession = await readSessionFromStorage(sessionStorageKey);
			if (storedSession === undefined) deleteCookie(event, moduleOptions.cookie.name);
			else {
				event.context.sessionStorageKey = sessionStorageKey;
				session = storedSession;
			}
		}

		event.context.session = onChange(session, () => {
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
