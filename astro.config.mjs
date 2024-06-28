import { defineConfig, envField } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

// Import /serverless for a Serverless SSR site
import vercelServerless from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  adapter: vercelServerless(),
  experimental: {
    env: {
      schema: {
        SUPABASE_URL: envField.string({
          context: 'server',
          access: 'public',
          default: ''
        }),
        SUPABASE_KEY: envField.string({
          context: 'server',
          access: 'public',
          default: ''
        })
      }
    }
  }
})
