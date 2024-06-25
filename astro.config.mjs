import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

// Import /serverless for a Serverless SSR site

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind(), react()]
})
