import type { APIRoute } from 'astro'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL //import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_KEY //import.meta.env.SUPABASE_KEY
const test = 'x'

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      greeting: 'Hellox',
      supabaseUrl: supabaseUrl,
      supabaseKey: supabaseKey,
      test: test
    })
  )
}
