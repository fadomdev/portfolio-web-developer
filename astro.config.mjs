import { defineConfig, envField } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import db from '@astrojs/db'

// Import /serverless for a Serverless SSR site
import vercelServerless from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), db()],
  adapter: vercelServerless()
})
