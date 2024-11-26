import { registerHooksAndSetupCachedHandlers } from '@kikiutils/nitro-session';
import type { PluginOptions } from '@kikiutils/nitro-session/types/options';
import type { NitroApp } from 'nitropack/types';

import { useRuntimeConfig } from '#imports';

export default (nitroApp: NitroApp) => registerHooksAndSetupCachedHandlers(nitroApp, useRuntimeConfig().nuxtSession as Required<PluginOptions>, true);
