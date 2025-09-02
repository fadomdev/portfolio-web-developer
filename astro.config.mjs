import { defineConfig, envField } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

// Import /serverless for a Serverless SSR site
import vercel from '@astrojs/vercel'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), icon()],
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
})
