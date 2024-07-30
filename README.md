# 🛠️ vue-caster
- [🛠️ vue-caster](#️-vue-caster)
  - [How this works?](#how-this-works)
  - [Usage](#usage)
  - [Why](#why)
  - [TODO](#todo)
  - [License](#license)

This is a command line tool that can switch between Vue versions. It can be used in conjunction with [vue-demi](https://github.com/vueuse/vue-demi) for developing components compatible with both Vue 2 and Vue 3.

## How this works?
The way this package works is by using [npm install alias](https://docs.npmjs.com/cli/v8/commands/npm-install). 

First, install this package as "vue". Then, in the same project, install different versions of `Vue` under different names, such as `vue2.7`, `vue2.6`, `vue3`. Next, run the command line to switch `Vue` versions, and `vue-caster` will export the corresponding version of Vue.

If you are familiar with `vue-demi`, then the way `vue-caster` works is similar to `vue-demi`.

## Usage
1. Install `vue-caster` as `vue`:

```bash
npm install -D vue@npm:vue-caster vue-demi
```

2. Install different versions of `Vue` with different names:

```bash
npm install vue2.7@npm:vue@2.7.16
npm install vue3@npm:vue@3.4.34
```

3. Switch between Vue versions:
```bash
# v-cast <version> <alias>
v-cast 2.7 vue2.7
vue-demi-switch 2.7 vue2.7

# Switch to Vue 3
v-cast 3 vue3
vue-demi-switch 3 vue3
```

4. Import Vue in your code, use it as usual:

```js
// If Vue 2
import Vue from 'vue';

// If Vue 3
import { ref } from 'vue';
```

Or you can directly import from `vue-demi`

```js
import { version } from 'vue-demi'; // is the the version of Vue you are using
console.log(version); // version of Vue you are using
```

When you want to publish your package using `Vite`, just mark `vue` as external in `vite.config.js`:

```js
export default {
  optimizeDeps: {
    exclude: ['vue-demi', 'vue'],
  },
  rollupInputOptions: {
    external: ['vue-demi', 'vue'],
  },
};
```

When you need to bundle or use `vitest`, you will need `vue-demi`'s `isVue2` and `isVue3` to switch build configurations. You can refer to the `vite.config.ts` in the `/example` directory.

## Why
You might ask, why do we still need `vue-caster` when we already have `vue-demi`? The main reason is that when developing components that are compatible with both Vue 2 and Vue 3, it's difficult to use `.vue` files with only `vue-demi`. You might want to develop using TypeScript in `.vue` files, or for various reasons, you need to bundle it, but you find that there can only be one version of `vue` in `node_modules`. So when you want to bundle or test, version error messages pop up because they all import or require `vue`.

Can Vite `resolve.alias` solve this problem? No, because although alias can convert runtime code, it cannot handle the import or require of build tools.

To solve this problem, you could install different versions of Vue in different projects or pull out the packages with version dependency errors for customization. These are not comfortable solutions.

Thus, `vue-caster` was created. It is a proxy tool for Vue that can be used as different versions of Vue. Since it is installed as the name "vue" at the package level, the aforementioned path conversion issues are resolved.

## TODO
- [ ] Issue when direct vue import in vue-demi (entry not found: ./dist)
- [ ] vue-test-utils type error
- [ ] vite-plugin-dts cannot rollup types.
- [ ] There are still some of vue exports not be handled.

## License
MIT