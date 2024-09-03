import { supabase } from '../../lib/supabase'
import { type APIRoute } from 'astro'
import { z } from 'zod'

const invalid_type_error = 'Tipo no válido proporcionado para este campo.'
const required_error = 'Este campo no puede estar vacío.'

export const ContactSchema = z.object({
  name: z.string({ invalid_type_error, required_error }),
  email: z
    .string({ invalid_type_error, required_error })
    .email('Debe ingresar un email válido, por favor.'),
  subject: z.string({ invalid_type_error, required_error }),
  message: z.string({ invalid_type_error, required_error })
})

export const POST: APIRoute = async ({ request }) => {
  const contact = await request.json()

  try {
    const res = ContactSchema.parse(contact)
    const { data, error } = await supabase
      .from('contacts')
      .insert([res])
      .select()

    if (error) {
      return new Response(
        JSON.stringify({
          error: error,
          data: res
        }),
        { status: 500 }
      )
    }

    return new Response(
      JSON.stringify({
        data: res
      }),
      { status: 201 }
    )
  } catch (error) {
    console.log(error.issues)
    return new Response(
      JSON.stringify({
        error: error.issues,
        data: contact
      }),
      { status: 400 }
    )
  }
}

export const GET: APIRoute = async () => {
  const data = await supabase.from('contacts').select('*')
  return new Response(JSON.stringify(data))
}
