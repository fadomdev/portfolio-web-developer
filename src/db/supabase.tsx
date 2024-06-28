export const prerender = true

import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from 'astro:env/server'

//const supabaseUrl = import.meta.env.SUPABASE_URL
//const supabaseKey = import.meta.env.SUPABASE_KEY

const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
