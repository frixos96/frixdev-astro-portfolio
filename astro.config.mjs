// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],
  build: {
    // Inline all bundled CSS into <style> tags so it never becomes a
    // render-blocking <link> request (fixes Lighthouse render-blocking +
    // critical-chain warnings). Default "auto" only inlines <4 KB.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
