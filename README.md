# @kikiutils/nuxt-session

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Easy-to-use nuxt server-side session.

- [✨ Release Notes](./CHANGELOG.md)

## Features

- 🔄 Continuous session between requests using a cookie or header
- 🌐 Available in server-side middleware
- 💾 Auto-save session
- 📦 Store session data using a cookie, header, or [unjs/unstorage](https://github.com/unjs/unstorage) drivers
- 🔒 Optional strict IP validation to ensure session security
- 🛠️ TypeScript support

## Environment Requirements

- Nuxt version 3.9.x or higher, but below 4.x
- Node.js version 18 or higher

## Installation

1. Add dependency (example using pnpm).

```bash
pnpm add @kikiutils/nuxt-session
```

You can also use yarn, npm, or bun to add the dependency.

2. Add this module to the `modules` field in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@kikiutils/nuxt-session']
});
```

3. Create a `session.d.ts` file in the `server` folder under the project directory and and add the following code:

```typescript
declare module '@kikiutils/nuxt-session' {
  interface H3EventContextSession {
    // Define the session data here.
  }
}

export {};
```

That's it! You're ready to use sessions in your Nuxt app. Check out the [configuration](#configuration) and [usage](#usage) instructions below ✨.

## Configuration

Configure using `nuxtSession` in `nuxt.config.ts`.

```typescript
export default defineNuxtConfig({
  nuxtSession: {
    // Configure options here
  }
});
```

This package uses [`@kikiutils/nitro-session`](https://github.com/kiki-kanri/nitro-session) as its core. For related configuration instructions, please refer to this [link](https://github.com/kiki-kanri/nitro-session?tab=readme-ov-file#configuration).

Except for the configuration method mentioned above, all other options remain the same.

## Usage

Please refer to this [link](https://github.com/kiki-kanri/nitro-session?tab=readme-ov-file#usage) for related usage.

> [!IMPORTANT]
> This package is intended for use in the `server` folder of Nuxt. For more information about this folder, please see this [link](https://nuxt.com/docs/guide/directory-structure/server).
>
> Only requests with paths starting with `/api` will handle sessions.

## Server Runtime Utils

Please refer to this [link](https://github.com/kiki-kanri/nitro-session?tab=readme-ov-file#runtime-utils) for related server runtime utils.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/nuxt-session/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/nuxt-session.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[license-src]: https://img.shields.io/npm/l/@kikiutils/nuxt-session.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/kiki-kanri/nuxt-session/blob/main/LICENSE

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
