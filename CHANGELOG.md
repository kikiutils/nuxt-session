# Changelog

## v3.1.5

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v3.1.4...v3.1.5)

### 🏡 Chore

- Upgrade dependencies ([4f796f6](https://github.com/kikiutils/nuxt-session/commit/4f796f6))
- Upgrade dependencies and add `pnpm.onlyBuiltDependencies` setting to package.json ([4d8ae52](https://github.com/kikiutils/nuxt-session/commit/4d8ae52))
- Temporarily restrict TypeScript version to 5.6 ([f53fbfa](https://github.com/kikiutils/nuxt-session/commit/f53fbfa))

### 🎨 Styles

- Format and lint all files ([d1669d1](https://github.com/kikiutils/nuxt-session/commit/d1669d1))

### ❤️ Contributors

- kiki-kanri

## v3.1.4

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v3.1.3...v3.1.4)

### 🏡 Chore

- Modify eslint config ([02e7f99](https://github.com/kikiutils/nuxt-session/commit/02e7f99))
- Upgrade dependencies ([7a02367](https://github.com/kikiutils/nuxt-session/commit/7a02367))

### 🎨 Styles

- Format and lint all files ([af35ce6](https://github.com/kikiutils/nuxt-session/commit/af35ce6))

### ❤️ Contributors

- kiki-kanri

## v3.1.3

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v3.1.2...v3.1.3)

### 🏡 Chore

- Upgrade dependencies ([8813a88](https://github.com/kikiutils/nuxt-session/commit/8813a88))
- Upgrade dependencies ([3c36ef9](https://github.com/kikiutils/nuxt-session/commit/3c36ef9))
- Update package.json ([4ed773d](https://github.com/kikiutils/nuxt-session/commit/4ed773d))
- Switch changelog generation package ([8202ab4](https://github.com/kikiutils/nuxt-session/commit/8202ab4))
- Add release script to package.json ([4db9f4a](https://github.com/kikiutils/nuxt-session/commit/4db9f4a))
- Upgrade dependencies ([aeab46d](https://github.com/kikiutils/nuxt-session/commit/aeab46d))
- Replace Prettier with ESLint, add related files, and update VSCode settings ([e95d755](https://github.com/kikiutils/nuxt-session/commit/e95d755))
- Modify scripts in package.json ([a835e58](https://github.com/kikiutils/nuxt-session/commit/a835e58))

### 🎨 Styles

- Reorder badge URLs in README ([3137a3b](https://github.com/kikiutils/nuxt-session/commit/3137a3b))
- Format and lint all files ([aba09e9](https://github.com/kikiutils/nuxt-session/commit/aba09e9))

### ❤️ Contributors

- kiki-kanri

## v3.1.2

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v3.1.1...v3.1.2)

### 🏡 Chore

- Update keywords list in package.json ([bfe68a6](https://github.com/kikiutils/nuxt-session/commit/bfe68a6))
- Remove type field and add module field in package.json ([c5bebcb](https://github.com/kikiutils/nuxt-session/commit/c5bebcb))
- Update dependencies and README ([62fe065](https://github.com/kikiutils/nuxt-session/commit/62fe065))
- Upgrade dependencies ([d72d60b](https://github.com/kikiutils/nuxt-session/commit/d72d60b))

### ❤️ Contributors

- kiki-kanri

## v3.1.1

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v3.1.0...v3.1.1)

### 📖 Documentation

- Update README ([ed6963c](https://github.com/kikiutils/nuxt-session/commit/ed6963c))

### 🏡 Chore

- Upgrade dependencies ([af4f570](https://github.com/kikiutils/nuxt-session/commit/af4f570))

### ❤️ Contributors

- kiki-kanri

## v3.1.0

> [!NOTE]
> Due to the core `@kikiutils/nitro-session` being updated from 1.0.1 to 1.1.1, the version number has been bumped to 3.1.0.

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v3.0.0...v3.1.0)

### 📖 Documentation

- Update README ([0f3238e](https://github.com/kikiutils/nuxt-session/commit/0f3238e))

### 🏡 Chore

- Update .gitignore ([57f63d4](https://github.com/kikiutils/nuxt-session/commit/57f63d4))
- Upgrade dependencies ([f97f7f3](https://github.com/kikiutils/nuxt-session/commit/f97f7f3))
- Add engines field to package.json with Node.js >=18 ([aa00b31](https://github.com/kikiutils/nuxt-session/commit/aa00b31))
- Update keywords in package.json ([bc26c59](https://github.com/kikiutils/nuxt-session/commit/bc26c59))

### ❤️ Contributors

- kiki-kanri

## v3.0.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v2.0.4...v3.0.0)

### 🚀 Enhancements

- Add plugin and utils file for runtime ([1bb833b](https://github.com/kikiutils/nuxt-session/commit/1bb833b))
- Add type definitions ([f08e95c](https://github.com/kikiutils/nuxt-session/commit/f08e95c))
- Add main module file ([c1df894](https://github.com/kikiutils/nuxt-session/commit/c1df894))

### 🔄 Migration to v3

The following are the changes related to the configure options.

- The original `nuxtSession.storage` options is now changed to `nuxtSession.storage.data`.
- The original `nuxtSession.storage.driver` option type `cookie` is now changed to `cookie/header`.
- The original `nuxtSession.storage.keyLength` setting is now changed to `nuxtSession.storage.data.key.length`.
- The original `nuxtSession.storage.keyPrefix` setting is now changed to `nuxtSession.storage.data.key.prefix`.

### 📖 Documentation

- Update README ([0fc510c](https://github.com/kikiutils/nuxt-session/commit/0fc510c))

### 🏡 Chore

- Remove code files and non-development dependencies ([5371a4b](https://github.com/kikiutils/nuxt-session/commit/5371a4b))
- Update .gitignore ([4b36190](https://github.com/kikiutils/nuxt-session/commit/4b36190))
- Add `@kikiutils/nitro-session` dependency ([2c99639](https://github.com/kikiutils/nuxt-session/commit/2c99639))
- Set Nuxt compatibility requirement to >=3.9.0 ([bb69d36](https://github.com/kikiutils/nuxt-session/commit/bb69d36))

### ❤️ Contributors

- kiki-kanri

## v2.0.4

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v2.0.3...v2.0.4)

### 💅 Refactors

- Change method of adding server utils ([f95459a](https://github.com/kikiutils/nuxt-session/commit/f95459a))

### 🏡 Chore

- Upgrade dependencies and remove @nuxt/eslint-config dependency ([113ba2c](https://github.com/kikiutils/nuxt-session/commit/113ba2c))
- Modify export types statements ([e8d8c0b](https://github.com/kikiutils/nuxt-session/commit/e8d8c0b))

### ❤️ Contributors

- kiki-kanri

## v2.0.3

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v2.0.2...v2.0.3)

### 🚀 Enhancements

- Add ioredis dependency ([7654fc7](https://github.com/kikiutils/nuxt-session/commit/7654fc7))

### 📖 Documentation

- Update README ([b0b323c](https://github.com/kikiutils/nuxt-session/commit/b0b323c))

### 🏡 Chore

- Upgrade dependencies ([a086b14](https://github.com/kikiutils/nuxt-session/commit/a086b14))
- Modify some commands in package.json scripts ([2698b7f](https://github.com/kikiutils/nuxt-session/commit/2698b7f))
- Upgrade dependencies ([7476dcc](https://github.com/kikiutils/nuxt-session/commit/7476dcc))

### 🎨 Styles

- Change location of some import statements ([6bd757b](https://github.com/kikiutils/nuxt-session/commit/6bd757b))

### ❤️ Contributors

- kiki-kanri

## v2.0.2

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v2.0.1...v2.0.2)

### 💅 Refactors

- Change method of adding server utils ([4f843a4](https://github.com/kikiutils/nuxt-session/commit/4f843a4))

### 🏡 Chore

- Upgrade dependencies ([027b066](https://github.com/kikiutils/nuxt-session/commit/027b066))
- Add author field to package.json ([2d9ba45](https://github.com/kikiutils/nuxt-session/commit/2d9ba45))

### ❤️ Contributors

- kiki-kanri

## v2.0.1

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v2.0.0...v2.0.1)

### 💅 Refactors

- Change method of adding server utils ([b81668d](https://github.com/kikiutils/nuxt-session/commit/b81668d))

### 🏡 Chore

- Upgrade dependencies ([2a61ba1](https://github.com/kikiutils/nuxt-session/commit/2a61ba1))

### ❤️ Contributors

- kiki-kanri

## v2.0.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v1.2.2...v2.0.0)

### 🚀 Enhancements

- Add node-ciphers package and update files config in package.json ([7c3b31b](https://github.com/kikiutils/nuxt-session/commit/7c3b31b))
- ⚠️ Add new cookie encryption options and refactor encryption methods ([b98feb6](https://github.com/kikiutils/nuxt-session/commit/b98feb6))

### 🩹 Fixes

- Resolve missing default values in cookie storage options ([f3f0755](https://github.com/kikiutils/nuxt-session/commit/f3f0755))
- Correct key length check to account for encoding ([0d9cecb](https://github.com/kikiutils/nuxt-session/commit/0d9cecb))

### 💅 Refactors

- Remove redundant !== checks ([6a8cf7e](https://github.com/kikiutils/nuxt-session/commit/6a8cf7e))
- ⚠️  Increase minimum storage keyLength to 16 ([0b74b42](https://github.com/kikiutils/nuxt-session/commit/0b74b42))

### 📖 Documentation

- Add example comments to server utils functions ([2dc83d4](https://github.com/kikiutils/nuxt-session/commit/2dc83d4))
- Update interface attributes docs ([274086e](https://github.com/kikiutils/nuxt-session/commit/274086e))
- Update README and doc ([20477ae](https://github.com/kikiutils/nuxt-session/commit/20477ae))

### 🏡 Chore

- Upgrade dependencies ([8a232b4](https://github.com/kikiutils/nuxt-session/commit/8a232b4))

### 🎨 Styles

- Remove punctuation from error messages ([b7e5a87](https://github.com/kikiutils/nuxt-session/commit/b7e5a87))

#### ⚠️ Breaking Changes

- ⚠️ Add new cookie encryption options and refactor encryption methods ([b98feb6](https://github.com/kikiutils/nuxt-session/commit/b98feb6))
- ⚠️ Increase minimum storage keyLength to 16 ([0b74b42](https://github.com/kikiutils/nuxt-session/commit/0b74b42))

### ❤️ Contributors

- kiki-kanri

## v1.2.2

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v1.2.1...v1.2.2)

### 🩹 Fixes

- Correct erroneous declare module names ([261e4be](https://github.com/kikiutils/nuxt-session/commit/261e4be))

### 🏡 Chore

- Upgrade dependencies ([5fc18dd](https://github.com/kikiutils/nuxt-session/commit/5fc18dd))

### 🎨 Styles

- Remove 'prettier-ignore' comments ([ed510c6](https://github.com/kikiutils/nuxt-session/commit/ed510c6))

### ❤️ Contributors

- kiki-kanri

## v1.2.1

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v1.2.0...v1.2.1)

### 🩹 Fixes

- Revise addImports method to address missing type ([f2f76c9](https://github.com/kikiutils/nuxt-session/commit/f2f76c9))

### 📖 Documentation

- Update doc and readme ([d497d56](https://github.com/kikiutils/nuxt-session/commit/d497d56))

### ❤️ Contributors

- kiki-kanri

## v1.2.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v1.1.0...v1.2.0)

### 🚀 Enhancements

- Add retrieve and remove session key composable function ([9486446](https://github.com/kikiutils/nuxt-session/commit/9486446))

### 🔥 Performance

- Optimize session storage format ([542c5de](https://github.com/kikiutils/nuxt-session/commit/542c5de))

### 💅 Refactors

- Simplify truthiness check ([2ce869f](https://github.com/kikiutils/nuxt-session/commit/2ce869f))
- Clean up the code ([bcea274](https://github.com/kikiutils/nuxt-session/commit/bcea274))
- Move error checks to improve logic flow and accuracy ([369fbb9](https://github.com/kikiutils/nuxt-session/commit/369fbb9))
- Use prefixStorage utils for storage prefix handling ([503052b](https://github.com/kikiutils/nuxt-session/commit/503052b))
- Streamline function syntax and improve code formatting ([1149ab3](https://github.com/kikiutils/nuxt-session/commit/1149ab3))

### 📖 Documentation

- Update readme ([0d8be0e](https://github.com/kikiutils/nuxt-session/commit/0d8be0e))
- Update doc and readme ([1348ba7](https://github.com/kikiutils/nuxt-session/commit/1348ba7))

### ❤️ Contributors

- kiki-kanri

## v1.1.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v1.0.1...v1.1.0)

### 🚀 Enhancements

- Add enabled option and functionality ([afe5351](https://github.com/kikiutils/nuxt-session/commit/afe5351))

### 🔥 Performance

- Shorten property names in storage session for reduced size ([fc8ea4d](https://github.com/kikiutils/nuxt-session/commit/fc8ea4d))

### 🏡 Chore

- Update log messages for clarity ([a976195](https://github.com/kikiutils/nuxt-session/commit/a976195))

### ❤️ Contributors

- kiki-kanri

## v1.0.1

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v1.0.0...v1.0.1)

### 🩹 Fixes

- Correct erroneous add plugin paths ([a096b5b](https://github.com/kikiutils/nuxt-session/commit/a096b5b))

### 🏡 Chore

- Update repository format in package.json ([4cc636c](https://github.com/kikiutils/nuxt-session/commit/4cc636c))

### ❤️ Contributors

- kiki-kanri

## v1.0.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v0.4.0...v1.0.0)

### 💅 Refactors

- Split and reorganize type definitions ([9bd831e](https://github.com/kikiutils/nuxt-session/commit/9bd831e))
- Export H3EventContextSession type ([4f96852](https://github.com/kikiutils/nuxt-session/commit/4f96852))
- Modify runtime directory structure ([7c3a5eb](https://github.com/kikiutils/nuxt-session/commit/7c3a5eb))
- Use symbols to represent session properties ([12e91d6](https://github.com/kikiutils/nuxt-session/commit/12e91d6))

### 📖 Documentation

- Update readme ([de341bf](https://github.com/kikiutils/nuxt-session/commit/de341bf))

### 🏡 Chore

- Upgrade dependencies ([564161b](https://github.com/kikiutils/nuxt-session/commit/564161b))

### ❤️ Contributors

- kiki-kanri

## v0.4.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- Add global H3Event type ([25cb18c](https://github.com/kikiutils/nuxt-session/commit/25cb18c))
- Add setup event context session function ([5a6f7d9](https://github.com/kikiutils/nuxt-session/commit/5a6f7d9))
- Add clear session composable function ([29ce0f7](https://github.com/kikiutils/nuxt-session/commit/29ce0f7))
- Add clear session playground examples ([6054b8d](https://github.com/kikiutils/nuxt-session/commit/6054b8d))

### 🩹 Fixes

- Remove global types to resolve build errors ([973a1d5](https://github.com/kikiutils/nuxt-session/commit/973a1d5))

### 💅 Refactors

- Use function to set session ([d1bfa18](https://github.com/kikiutils/nuxt-session/commit/d1bfa18))

### 📖 Documentation

- Update readme ([c241ff7](https://github.com/kikiutils/nuxt-session/commit/c241ff7))

### 🏡 Chore

- Remove eslint and test ([170d5ba](https://github.com/kikiutils/nuxt-session/commit/170d5ba))
- Upgrade dependencies ([fb85098](https://github.com/kikiutils/nuxt-session/commit/fb85098))

### ❤️ Contributors

- kiki-kanri

## v0.3.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v0.2.0...v0.3.0)

### 🚀 Enhancements

- Add session data encryption and decryption functions ([cddf9d5](https://github.com/kikiutils/nuxt-session/commit/cddf9d5))
- Update playground api url and add test button ([2a79219](https://github.com/kikiutils/nuxt-session/commit/2a79219))
- Add cookie storage for session data ([2037f08](https://github.com/kikiutils/nuxt-session/commit/2037f08))
- Implement session ttl functionality ([e3e0ffe](https://github.com/kikiutils/nuxt-session/commit/e3e0ffe))

### 🩹 Fixes

- Make module options type required in setup ([166f42b](https://github.com/kikiutils/nuxt-session/commit/166f42b))
- Delete session cookie when session data is unobtainable ([1a373ea](https://github.com/kikiutils/nuxt-session/commit/1a373ea))

### 💅 Refactors

- Rename setup function ([1805d3c](https://github.com/kikiutils/nuxt-session/commit/1805d3c))
- Refactor codebase for session storage operations ([7d9c8ff](https://github.com/kikiutils/nuxt-session/commit/7d9c8ff))
- Rename functions and variables ([98eee34](https://github.com/kikiutils/nuxt-session/commit/98eee34))

### 📖 Documentation

- Update README and add interface property descriptions ([f4566a0](https://github.com/kikiutils/nuxt-session/commit/f4566a0))
- Update readme ([fac6646](https://github.com/kikiutils/nuxt-session/commit/fac6646))

### 🏡 Chore

- Add PartialH3EventContextSession type ([b79d721](https://github.com/kikiutils/nuxt-session/commit/b79d721))
- Upgrade dependencies ([797d204](https://github.com/kikiutils/nuxt-session/commit/797d204))
- Add keywords in package.json ([8824679](https://github.com/kikiutils/nuxt-session/commit/8824679))

### ❤️ Contributors

- kiki-kanri

## v0.2.0

[compare changes](https://github.com/kikiutils/nuxt-session/compare/v0.1.0...v0.1.1)

### 🚀 Enhancements

- Add logging for session initialization ([d4620ff](https://github.com/kikiutils/nuxt-session/commit/d4620ff))
- **validation:** Add keyLength check ([53dcc33](https://github.com/kikiutils/nuxt-session/commit/53dcc33))

### 🩹 Fixes

- Remove optional chaining ([b96336b](https://github.com/kikiutils/nuxt-session/commit/b96336b))
- Disallow setting key options in cookie storage mode ([7911a56](https://github.com/kikiutils/nuxt-session/commit/7911a56))
- Add url check in beforeResponse handling ([5f8f6fb](https://github.com/kikiutils/nuxt-session/commit/5f8f6fb))
- Remove incorrect type import ([31a8328](https://github.com/kikiutils/nuxt-session/commit/31a8328))
- Make context.session properties optional ([7e14fc2](https://github.com/kikiutils/nuxt-session/commit/7e14fc2))

### 💅 Refactors

- Simplifying ModuleOptions type usage ([b16e736](https://github.com/kikiutils/nuxt-session/commit/b16e736))

### 📖 Documentation

- Enhance readme documentation ([89357f7](https://github.com/kikiutils/nuxt-session/commit/89357f7))

### 🏡 Chore

- Edit package description and tsconfig ([44a97b3](https://github.com/kikiutils/nuxt-session/commit/44a97b3))
- Upgrade dependencies ([2ec04e6](https://github.com/kikiutils/nuxt-session/commit/2ec04e6))

### ❤️ Contributors

- kiki-kanri

## v0.1.0

### 🚀 Enhancements

- Setup module.ts ([a5090a1](https://github.com/kikiutils/nuxt-session/commit/a5090a1))
- Add get storage utils ([374312d](https://github.com/kikiutils/nuxt-session/commit/374312d))
- Add get unique storage key utils ([5477f38](https://github.com/kikiutils/nuxt-session/commit/5477f38))
- Add plugin hitro hooks and main functions ([5bfcd85](https://github.com/kikiutils/nuxt-session/commit/5bfcd85))
- Add test apis and types ([7f00b33](https://github.com/kikiutils/nuxt-session/commit/7f00b33))

### 🩹 Fixes

- Fixed driver init options readonly error ([fe9f420](https://github.com/kikiutils/nuxt-session/commit/fe9f420))
- Fixed type error ([d84694c](https://github.com/kikiutils/nuxt-session/commit/d84694c))
- Defu should be in the dependencies list ([d6d419d](https://github.com/kikiutils/nuxt-session/commit/d6d419d))
- Type import should use the import type statement ([e284aa5](https://github.com/kikiutils/nuxt-session/commit/e284aa5))

### 💅 Refactors

- Use nanoid to generate key ([7484abe](https://github.com/kikiutils/nuxt-session/commit/7484abe))
- Simplify storage key retrieval in response ([2bbf9b1](https://github.com/kikiutils/nuxt-session/commit/2bbf9b1))
- Use namespace to define SessionStorageOptions type ([2b556f1](https://github.com/kikiutils/nuxt-session/commit/2b556f1))

### 🏡 Chore

- Add base files ([598ef61](https://github.com/kikiutils/nuxt-session/commit/598ef61))
- Remove nuxt-devtools and add unstorage ([8db094e](https://github.com/kikiutils/nuxt-session/commit/8db094e))
- Add lodash-es package ([0e97a79](https://github.com/kikiutils/nuxt-session/commit/0e97a79))
- Add types file ([ccffa8f](https://github.com/kikiutils/nuxt-session/commit/ccffa8f))
- Remove lodash-es ([bf5634e](https://github.com/kikiutils/nuxt-session/commit/bf5634e))
- Add on-change package and upgrade dependencies ([b5894ef](https://github.com/kikiutils/nuxt-session/commit/b5894ef))
- Make some types required and add server types ([ff20343](https://github.com/kikiutils/nuxt-session/commit/ff20343))
- Add fs and fs-lite storage drivers options ([390f9ae](https://github.com/kikiutils/nuxt-session/commit/390f9ae))
- Remove test in release script ([292186a](https://github.com/kikiutils/nuxt-session/commit/292186a))
- Edit package description ([01ca4b1](https://github.com/kikiutils/nuxt-session/commit/01ca4b1))

### ❤️ Contributors

- kiki-kanri
