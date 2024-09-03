import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL //import.meta.env.SUPABASE_URL
const supabaseKey = import.meta.env.SUPABASE_KEY //import.meta.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
