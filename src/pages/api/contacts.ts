import { db, Contact, isDbError } from 'astro:db'
import type { APIRoute } from 'astro'
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
    ContactSchema.parse(contact)

    await db.insert(Contact).values(contact)
  } catch (e) {
    if (isDbError(e)) {
      return new Response(`Cannot insert contact \n\n${e.message}`, {
        status: 400
      })
    }
    return new Response('An unexpected error occurred', { status: 500 })
  }

  return new Response(JSON.stringify(contact))
}
