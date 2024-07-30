/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue3Plugin from '@vitejs/plugin-vue'
import vue2Plugin from '@vitejs/plugin-vue2'
import { isVue2, version } from "vue-demi";
import dts from "vite-plugin-dts"
import { resolve } from "node:path";


console.log("vue version: ", version, "isVue2", isVue2);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    isVue2 ? vue2Plugin() : vue3Plugin(),
    dts({
      // rollupTypes: true, // Still not working
      tsconfigPath: './tsconfig.app.json'
    })
  ],

  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'happy-dom',
  },
  optimizeDeps: {
    exclude: ['vue', 'vue-demi', 'vue2.7', 'vue3']
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',

    },
    rollupOptions: {
      external: ['vue', 'vue-demi', 'vue2.7', 'vue3'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          'vue-demi': "VueDemi"
        },
      },

    }
  }
})
