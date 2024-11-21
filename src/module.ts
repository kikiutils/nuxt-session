import { initialization } from '@kikiutils/nitro-session';
import type { PluginOptions } from '@kikiutils/nitro-session/types/options';
import { addServerImportsDir, addServerPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit';

export type {} from './types/h3';
export type { H3EventContextSession } from './types/session';

export default defineNuxtModule<PluginOptions>({
	meta: {
		compatibility: { nuxt: '>=3.9.0' },
		configKey: 'nuxtSession',
		name: '@kikiutils/nuxt-session',
	},
	async setup(options, nuxt) {
		const logger = useLogger();
		const initializationResult = await initialization('Nuxt', options);
		if (!initializationResult) return;
		nuxt.options.runtimeConfig.nuxtSession = initializationResult.pluginOptions;
		const resolver = createResolver(import.meta.url);
		addServerImportsDir(resolver.resolve('./runtime/server/utils'));
		addServerPlugin(resolver.resolve('./runtime/server/plugins/session'));
		logger.success('Nuxt session initialization successful.');
	},
});
