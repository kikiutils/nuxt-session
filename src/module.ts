import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: '@kikiutils/nuxt-session',
		configKey: 'nuxtSession'
	},
	defaults: {},
	setup(options, nuxt) {
		const resolver = createResolver(import.meta.url);
		addPlugin(resolver.resolve('./runtime/plugin'));
	}
});
