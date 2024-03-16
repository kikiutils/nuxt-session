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
- ✔️ Using cookies or [unjs/unstorage](https://github.com/unjs/unstorage) drivers to store session data
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

Memory storage is used by default, which means that all sessions will be lost when the server is restarted.

To change to another storage method, please refer to the [storage mode](#storage-mode) below.

Note that the session storage mechanism relies on **JSON serialization**. Therefore, it is important to ensure that only serializable data is stored in the session. Objects containing methods (functions) or complex types that JSON cannot handle, such as date objects or custom class instances, should not be stored directly.

Attempting to store non-serializable objects results in lost method bindings and can lead to unexpected behavior. Be sure to convert such objects to a serializable format before storing them in a session.

To pass a property in middleware or elsewhere, set the value directly in the event context.

`server/middleware/auth.ts`

```typescript
export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api')) return;
  const user = await UserModel.findOneById(event.context.session.userId);
  if (user) event.context.session.user = user; // This is not the right operation!
  if (user) event.context.user = user; // It's the right thing to do.
  // Remaining operations...
});
```

## Server utils

### clearH3EventContextSession

Clears the session.

The cookie will be deleted if no new value is set after clearing.

`server/api/logout.ts`

```typescript
export default defineEventHandler((event) => {
  clearH3EventContextSession(event);
  // Remaining operations...
  return 'success';
});
```

### popH3EventContextSession

Removes a key-value pair from the session and returns the value.

`server/api/login.ts`

```typescript
export default defineEventHandler((event) => {
  const code = popH3EventContextSession(event, 'code');
  // Remaining operations...
  return 'success';
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

If you select cookie, the data will be encrypted and stored in the cookie and you will need to set the [encryption key](#storageoptionskey).

If you select the unstorage driver, the data will be stored as key-value pairs but not encrypted.

Refer to this [option](#storagedriver) to configure the storage mode.

## Configuration

### cookie.httpOnly

- **Type:** `boolean`
- **Default:** `true`

### cookie.name

- **Type:** `string`
- **Default:** `'session'`

### cookie.path

- **Type:** `string`
- **Default:** `'/'`

### cookie.sameSite

- **Type:** `'lax' | 'none' | 'strict'`
- **Default:** `'strict'`

### cookie.secure

- **Type:** `boolean`
- **Default:** `true`

### enabled

- **Type:** `boolean`
- **Default:** `true`

### maxAge

- **Type:** `number`
- **Default:** `86400`

Session expiration time in seconds.

It also sets the cookie expiration time.

### storage.driver

- **Type:** `'cookie' | 'fs' | 'fs-lite' | 'lru-cache' | 'memory' | 'redis'`
- **Default:** `'memory'`

Choose how session content is stored.

If set as a cookie, the [encryption key](#storageoptionskey) option must be set.

If set as an unstorage driver, please refer to the [document](https://unstorage.unjs.io/drivers/memory) for details on how to use it and configuration [storage.options](#storageoptions).

### storage.keyLength

- **Type:** `number`
- **Default:** `16`

Set the length of the session storage key (excluding the prefix).

This value should not be set to less than 16, otherwise it is easy for an attacker to brute-force it.

Can only be set if `storage.driver` is not set as a cookie.

### storage.keyPrefix

- **Type:** `string`
- **Default:** `'session'`

Set the prefix of the session storage key.

Can only be set if `storage.driver` is not set as a cookie.

### storage.options

Setting options according to driver type.

This options is not available if the driver is set to memory.

If `storage.driver` is set to cookie, please refer to cookie related [options](#cookie-storage-options).

### Cookie storage options

Can only be set when `storage.driver` is set to cookie.

#### storage.options.encodingOptions

Codec settings for encoding strings into buffers or decoding buffers into strings.

Adjusting this setting arbitrarily may result in failure to encrypt or decrypt data properly.

#### storage.options.encryptionMode

- **Type:** `'cbc' | 'cfb' | 'cfb1' | 'cfb8' | 'ctr' | 'ofb'`
- **Default:** `'ctr'`

AES encryption mode used.

ECB mode is not allowed due to security reasons.

#### storage.options.key

- **Type:** `string`

The key used for encryption, length must be one of 16, 24 or 32.

The length of the key is determined by the `storage.options.encodingOptions.key` setting (default value is utf8) through the Buffer.from converted byteLength.

The key should not be leaked to the front-end or elsewhere, it is recommended to use the env setting.

```typescript
export default defineNuxtConfig({
  nuxtSession: {
    storage: {
      driver: 'cookie',
      options: {
        key: process.env.SESSION_COOKIE_KEY
      }
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

## TODO

- [ ] Auto-refresh expiration time
- [ ] Compare request ip
- [ ] Create nitro-session package and migrate core functions and logic into it

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/nuxt-session/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/nuxt-session.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[license-src]: https://img.shields.io/npm/l/@kikiutils/nuxt-session.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@kikiutils/nuxt-session

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
