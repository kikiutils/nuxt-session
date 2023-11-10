# Changelog

## v1.0.1

[compare changes](https://github.com/kiki-kanri/nuxt-session/compare/v1.0.0...v1.0.1)

### 🩹 Fixes

- Correct erroneous add plugin paths ([a096b5b](https://github.com/kiki-kanri/nuxt-session/commit/a096b5b))

### 🏡 Chore

- Update repository format in package.json ([4cc636c](https://github.com/kiki-kanri/nuxt-session/commit/4cc636c))

### ❤️ Contributors

- kiki-kanri <a470666@gmail.com>

## v1.0.0

[compare changes](https://github.com/kiki-kanri/nuxt-session/compare/v0.4.0...v1.0.0)

### 💅 Refactors

- Split and reorganize type definitions ([9bd831e](https://github.com/kiki-kanri/nuxt-session/commit/9bd831e))
- Export H3EventContextSession type ([4f96852](https://github.com/kiki-kanri/nuxt-session/commit/4f96852))
- Modify runtime directory structure ([7c3a5eb](https://github.com/kiki-kanri/nuxt-session/commit/7c3a5eb))
- Use symbols to represent session properties ([12e91d6](https://github.com/kiki-kanri/nuxt-session/commit/12e91d6))

### 📖 Documentation

- Update readme ([de341bf](https://github.com/kiki-kanri/nuxt-session/commit/de341bf))

### 🏡 Chore

- Upgrade dependencies ([564161b](https://github.com/kiki-kanri/nuxt-session/commit/564161b))

### ❤️ Contributors

- kiki-kanri <a470666@gmail.com>

## v0.4.0

[compare changes](https://github.com/kiki-kanri/nuxt-session/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- Add global H3Event type ([25cb18c](https://github.com/kiki-kanri/nuxt-session/commit/25cb18c))
- Add setup event context session function ([5a6f7d9](https://github.com/kiki-kanri/nuxt-session/commit/5a6f7d9))
- Add clear session composable function ([29ce0f7](https://github.com/kiki-kanri/nuxt-session/commit/29ce0f7))
- Add clear session playground examples ([6054b8d](https://github.com/kiki-kanri/nuxt-session/commit/6054b8d))

### 🩹 Fixes

- Remove global types to resolve build errors ([973a1d5](https://github.com/kiki-kanri/nuxt-session/commit/973a1d5))

### 💅 Refactors

- Use function to set session ([d1bfa18](https://github.com/kiki-kanri/nuxt-session/commit/d1bfa18))

### 📖 Documentation

- Update readme ([c241ff7](https://github.com/kiki-kanri/nuxt-session/commit/c241ff7))

### 🏡 Chore

- Remove eslint and test ([170d5ba](https://github.com/kiki-kanri/nuxt-session/commit/170d5ba))
- Upgrade dependencies ([fb85098](https://github.com/kiki-kanri/nuxt-session/commit/fb85098))

### ❤️ Contributors

- kiki-kanri <a470666@gmail.com>

## v0.3.0

[compare changes](https://github.com/kiki-kanri/nuxt-session/compare/v0.2.0...v0.3.0)

### 🚀 Enhancements

- Add session data encryption and decryption functions ([cddf9d5](https://github.com/kiki-kanri/nuxt-session/commit/cddf9d5))
- Update playground api url and add test button ([2a79219](https://github.com/kiki-kanri/nuxt-session/commit/2a79219))
- Add cookie storage for session data ([2037f08](https://github.com/kiki-kanri/nuxt-session/commit/2037f08))
- Implement session ttl functionality ([e3e0ffe](https://github.com/kiki-kanri/nuxt-session/commit/e3e0ffe))

### 🩹 Fixes

- Make module options type required in setup ([166f42b](https://github.com/kiki-kanri/nuxt-session/commit/166f42b))
- Delete session cookie when session data is unobtainable ([1a373ea](https://github.com/kiki-kanri/nuxt-session/commit/1a373ea))

### 💅 Refactors

- Rename setup function ([1805d3c](https://github.com/kiki-kanri/nuxt-session/commit/1805d3c))
- Refactor codebase for session storage operations ([7d9c8ff](https://github.com/kiki-kanri/nuxt-session/commit/7d9c8ff))
- Rename functions and variables ([98eee34](https://github.com/kiki-kanri/nuxt-session/commit/98eee34))

### 📖 Documentation

- Update README and add interface property descriptions ([f4566a0](https://github.com/kiki-kanri/nuxt-session/commit/f4566a0))
- Update readme ([fac6646](https://github.com/kiki-kanri/nuxt-session/commit/fac6646))

### 🏡 Chore

- Add PartialH3EventContextSession type ([b79d721](https://github.com/kiki-kanri/nuxt-session/commit/b79d721))
- Upgrade dependencies ([797d204](https://github.com/kiki-kanri/nuxt-session/commit/797d204))
- Add keywords in package.json ([8824679](https://github.com/kiki-kanri/nuxt-session/commit/8824679))

### ❤️ Contributors

- kiki-kanri <a470666@gmail.com>

## v0.2.0

[compare changes](https://github.com/kiki-kanri/nuxt-session/compare/v0.1.0...v0.1.1)

### 🚀 Enhancements

- Add logging for session initialization ([d4620ff](https://github.com/kiki-kanri/nuxt-session/commit/d4620ff))
- **validation:** Add keyLength check ([53dcc33](https://github.com/kiki-kanri/nuxt-session/commit/53dcc33))

### 🩹 Fixes

- Remove optional chaining ([b96336b](https://github.com/kiki-kanri/nuxt-session/commit/b96336b))
- Disallow setting key options in cookie storage mode ([7911a56](https://github.com/kiki-kanri/nuxt-session/commit/7911a56))
- Add url check in beforeResponse handling ([5f8f6fb](https://github.com/kiki-kanri/nuxt-session/commit/5f8f6fb))
- Remove incorrect type import ([31a8328](https://github.com/kiki-kanri/nuxt-session/commit/31a8328))
- Make context.session properties optional ([7e14fc2](https://github.com/kiki-kanri/nuxt-session/commit/7e14fc2))

### 💅 Refactors

- Simplifying ModuleOptions type usage ([b16e736](https://github.com/kiki-kanri/nuxt-session/commit/b16e736))

### 📖 Documentation

- Enhance readme documentation ([89357f7](https://github.com/kiki-kanri/nuxt-session/commit/89357f7))

### 🏡 Chore

- Edit package description and tsconfig ([44a97b3](https://github.com/kiki-kanri/nuxt-session/commit/44a97b3))
- Upgrade dependencies ([2ec04e6](https://github.com/kiki-kanri/nuxt-session/commit/2ec04e6))

### ❤️ Contributors

- kiki-kanri <a470666@gmail.com>

## v0.1.0

### 🚀 Enhancements

- Setup module.ts ([a5090a1](https://github.com/kiki-kanri/nuxt-session/commit/a5090a1))
- Add get storage utils ([374312d](https://github.com/kiki-kanri/nuxt-session/commit/374312d))
- Add get unique storage key utils ([5477f38](https://github.com/kiki-kanri/nuxt-session/commit/5477f38))
- Add plugin hitro hooks and main functions ([5bfcd85](https://github.com/kiki-kanri/nuxt-session/commit/5bfcd85))
- Add test apis and types ([7f00b33](https://github.com/kiki-kanri/nuxt-session/commit/7f00b33))

### 🩹 Fixes

- Fixed driver init options readonly error ([fe9f420](https://github.com/kiki-kanri/nuxt-session/commit/fe9f420))
- Fixed type error ([d84694c](https://github.com/kiki-kanri/nuxt-session/commit/d84694c))
- Defu should be in the dependencies list ([d6d419d](https://github.com/kiki-kanri/nuxt-session/commit/d6d419d))
- Type import should use the import type statement ([e284aa5](https://github.com/kiki-kanri/nuxt-session/commit/e284aa5))

### 💅 Refactors

- Use nanoid to generate key ([7484abe](https://github.com/kiki-kanri/nuxt-session/commit/7484abe))
- Simplify storage key retrieval in response ([2bbf9b1](https://github.com/kiki-kanri/nuxt-session/commit/2bbf9b1))
- Use namespace to define SessionStorageOptions type ([2b556f1](https://github.com/kiki-kanri/nuxt-session/commit/2b556f1))

### 🏡 Chore

- Add base files ([598ef61](https://github.com/kiki-kanri/nuxt-session/commit/598ef61))
- Remove nuxt-devtools and add unstorage ([8db094e](https://github.com/kiki-kanri/nuxt-session/commit/8db094e))
- Add lodash-es package ([0e97a79](https://github.com/kiki-kanri/nuxt-session/commit/0e97a79))
- Add types file ([ccffa8f](https://github.com/kiki-kanri/nuxt-session/commit/ccffa8f))
- Remove lodash-es ([bf5634e](https://github.com/kiki-kanri/nuxt-session/commit/bf5634e))
- Add on-change package and upgrade dependencies ([b5894ef](https://github.com/kiki-kanri/nuxt-session/commit/b5894ef))
- Make some types required and add server types ([ff20343](https://github.com/kiki-kanri/nuxt-session/commit/ff20343))
- Add fs and fs-lite storage drivers options ([390f9ae](https://github.com/kiki-kanri/nuxt-session/commit/390f9ae))
- Remove test in release script ([292186a](https://github.com/kiki-kanri/nuxt-session/commit/292186a))
- Edit package description ([01ca4b1](https://github.com/kiki-kanri/nuxt-session/commit/01ca4b1))

### ❤️ Contributors

- kiki-kanri <a470666@gmail.com>
