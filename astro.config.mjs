import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://block-builders.tech',
  integrations: [
    react(),
    tailwind()
  ],
  output: 'hybrid',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    ssr: {
      noExternal: ['lucide-react']
    }
  }
});
