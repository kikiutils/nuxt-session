import { useLogger } from '@nuxt/kit';
import { deleteCookie, getCookie, setCookie } from 'h3';
import { nanoid } from 'nanoid';
import onChange from 'on-change';
import type { NitroApp } from 'nitropack';

import { useRuntimeConfig } from '#imports';
import { createSessionCipherFunctions, createSessionStorageFunctions } from './utils';
import type { PartialH3EventContextSession, RequiredModuleOptions } from '../types';

const logger = useLogger();

function setupUseCookieStorageHooks(moduleOptions: RequiredModuleOptions.UseCookieStorage, nitroApp: NitroApp) {
	logger.info(`Use cookie to store the session.`);
	const { decryptSession, encryptSession } = createSessionCipherFunctions(moduleOptions.storage.secret);
	nitroApp.hooks.hook('beforeResponse', (event) => {
		if (!event.context.sessionChanged || !event.path.startsWith('/api')) return;
		const encryptedSession = encryptSession(event.context.session);
		if (encryptedSession !== undefined) setCookie(event, moduleOptions.cookie.name, encryptedSession, moduleOptions.cookie);
	});

	nitroApp.hooks.hook('request', (event) => {
		if (!event.path.startsWith('/api')) return;
		const encryptedSession = getCookie(event, moduleOptions.cookie.name);
		let sessionData: PartialH3EventContextSession = {};
		if (encryptedSession) {
			const decryptedSessionData = decryptSession(encryptedSession);
			if (decryptedSessionData === undefined) deleteCookie(event, moduleOptions.cookie.name);
			else sessionData = decryptedSessionData;
		}

		event.context.session = onChange(sessionData, () => {
			event.context.sessionChanged = true;
			onChange.unsubscribe(event.context.session);
		});
	});
}

function setupUseUnstorageHooks(moduleOptions: RequiredModuleOptions.UseUnstorage, nitroApp: NitroApp) {
	logger.info(`Use unjs/unstorage with the driver "${moduleOptions.storage.driver}" to store the session.`);
	if (moduleOptions.storage.keyLength < 12) throw new Error('The storage key length must be 12 or more!');
	const { readSessionData, writeSessionData } = createSessionStorageFunctions(moduleOptions);
	nitroApp.hooks.hook('beforeResponse', async (event) => {
		if (!event.context.sessionChanged || !event.path.startsWith('/api')) return;
		const sessionStorageKey = event.context.sessionStorageKey || nanoid(moduleOptions.storage.keyLength);
		await writeSessionData(sessionStorageKey, event.context.session);
		setCookie(event, moduleOptions.cookie.name, sessionStorageKey, moduleOptions.cookie);
	});

	nitroApp.hooks.hook('request', async (event) => {
		if (!event.path.startsWith('/api')) return;
		const sessionStorageKey = getCookie(event, moduleOptions.cookie.name);
		let sessionData: PartialH3EventContextSession = {};
		if (sessionStorageKey) {
			const sessionStorageData = await readSessionData(sessionStorageKey);
			if (sessionStorageData === undefined) deleteCookie(event, moduleOptions.cookie.name);
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
