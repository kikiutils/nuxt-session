# @kikiutils/nuxt-session

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Easy-to-use nuxt server-side session.

- [✨ Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 Documentation](https://example.com) -->

## Features

- ✔️ Continuous session between requests using cookies
- ✔️ Available in server-side middleware
- ✔️ Auto save session
- ✔️ Using cookies to store session data
- ✔️ Using [unjs/unstorage](https://github.com/unjs/unstorage) drivers to store session data
- ✔️ Typescript support

## Quick Setup

1. Add `@kikiutils/nuxt-session` dependency to your project.

```bash
# Using pnpm
pnpm add -D @kikiutils/nuxt-session

# Using yarn
yarn add --dev @kikiutils/nuxt-session

# Using npm
npm install --save-dev @kikiutils/nuxt-session
```

2. Add `@kikiutils/nuxt-session` to the `modules` section of `nuxt.config.ts`.

```typescript
export default defineNuxtConfig({
  modules: [
    '@kikiutils/nuxt-session'
  ]
  // With options
  nuxtSession: {}
});
```

That's it! You can now use session in your Nuxt app ✨.

## Usage

You can use `event.context.session` to access the session in api routes or server-side middleware.

The [on-change](https://www.npmjs.com/package/on-change) package is used internally to detect if the session object has been changed, and if it hasn't, no data will be stored and no cookies will be set.

**Only requests with paths starting with `/api` load and set up sessions.**

`server/api/test.ts`

```typescript
export default defineEventHandler((event) => {
  event.context.session.account = 'account';
  event.context.session.username = 'name';
  // Remaining operations...
  return 'success';
});
```

`server/middleware/auth.ts`

```typescript
export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api')) return;
  const loginedUserId = event.context.session.userId;
  // Remaining operations...
});
```

You can use `clearH3EventContextSession` composable to clear session.

`server/api/logout.ts`

```typescript
export default defineEventHandler((event) => {
  clearH3EventContextSession(event);
  // Remaining operations...
  return 'success';
});
```

Memory storage is used by default, which means that all sessions will be lost when the server is restarted.

To change to another storage method, please refer to the [storage mode](#storage-mode) below.

Note that the session storage mechanism relies on **JSON serialization**. Therefore, it is important to ensure that only serializable data is stored in the session. Objects containing methods (functions) or complex types that JSON cannot handle, such as date objects or custom class instances, should not be stored directly.

Attempting to store non-serializable objects results in lost method bindings and can lead to unexpected behavior. Be sure to convert such objects to a serializable format before storing them in a session.

To pass a property in middleware or elsewhere, set the value directly in the event context.

`server/middleware/auth.ts`

```typescript
export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api')) return;
  const user = await UserModel.findOneById(event.context.session.userId);
  if (user) event.context.session.user = user; // This is not the right operation!
  if (user) event.context.user = user; // It's the right thing to do.
  // Remaining operations...
});
```

## Typescript support

To get full support for typescript, you need to add a new .d.ts file under your project folder:

`types/session.d.ts`

```typescript
declare module '@kikiutils/nuxt-session' {
  interface H3EventContextSession {
    // Define your session attributes.
  }
}

export {};
```

## Storage Mode

The package provides two methods for storing session data:
- cookie
- unjs/unstorage driver
  - fs
  - fs-lite
  - lru-cache
  - memory
  - redis

If you select cookie, the data will be encrypted and stored in the cookie and you will need to set the [encryption key](#storagesecret).

If you select the unstorage driver, the data will be stored as key-value pairs but not encrypted.

Refer to this [option](#storagedriver) to configure the storage mode.

## Configuration

### cookie.httpOnly

- **Type:** `boolean`
- **Default:** `true`

### cookie.name

- **Type:** `string`
- **Default:** `session`

### cookie.path

- **Type:** `string`
- **Default:** `/`

### cookie.sameSite

- **Type:** `lax | none | strict`
- **Default:** `strict`

### cookie.secure

- **Type:** `boolean`
- **Default:** `true`

### maxAge

- **Type:** `number`
- **Default:** `86400`

Session expiration time in seconds.

It also sets the cookie expiration time.

### storage.driver

- **Type:** `cookie | fs | fs-lite | lru-cache | memory | redis`
- **Default:** `memory`

Choose how session content is stored.

If set as a cookie, the [secret](#storagesecret) option must be set and none of the other options can be set.

### storage.keyLength

- **Type:** `number`
- **Default:** `16`

Set the length of the session storage key (excluding the prefix).

This value should not be set to less than 12, otherwise it is easy for an attacker to brute-force it.

### storage.keyPrefix

- **Type:** `string`
- **Default:** `session`

Set the prefix of the session storage key.

### storage.options

Setting options according to driver type.

This option is not available if the driver is set to memory.

`nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  nuxtSession: {
    storage: {
      driver: 'redis',
      options: {
        url: process.env.REDIS_URL
      }
    }
  }
});
```

### storage.secret

- **Type:** `string`

Only available when driver is set to `cookie`.

The secret must be set to 32 characters and ensures that it is not leaked anywhere.

`nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  nuxtSession: {
    storage: {
      driver: 'cookie',
      secret: process.env.SESSION_COOKIE_SECRET
    }
  }
});
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/nuxt-session/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/nuxt-session.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[license-src]: https://img.shields.io/npm/l/@kikiutils/nuxt-session.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
