import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Resend } from 'resend'
import { turso } from '../lib/turso'
import { buildContactEmail } from '../components/email/contact-template'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
  send: defineAction({
    accept: 'json',
    input: z.object({
      name: z.string(),
      email: z.string(),
      subject: z.string(),
      message: z.string()
    }),
    handler: async ({ name, email, subject, message }) => {
      if (
        !name.trim() ||
        !subject.trim() ||
        !message.trim() ||
        !/^[^@]+@[^@]+\.[^@]+$/.test(email)
      ) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Datos inválidos.'
        })
      }

      // 1. Guardar en Turso
      try {
        await turso.execute({
          sql: `INSERT INTO contacts (name,email,subject,message) VALUES (?,?,?,?)`,
          args: [name.trim(), email.trim(), subject.trim(), message.trim()]
        })
      } catch (e: any) {
        console.error(e)
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error guardando contacto.'
        })
      }

      // 2. Enviar correo
      const fromEmail = import.meta.env.RESEND_FROM_EMAIL
      const toEmail = import.meta.env.RESEND_RECEIVER_EMAIL
      const { html, text } = buildContactEmail({
        name,
        email,
        subject,
        message
      })

      try {
        const { data, error } = await resend.emails.send({
          from: `Portfolio <${fromEmail}>`,
          to: [toEmail],
          replyTo: toEmail,
          subject: `Contacto: ${subject}`,
          html,
          text
        })
        if (error) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message
          })
        }
        return { success: true, id: data?.id }
      } catch (e: any) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error enviando correo.'
        })
      }
    }
  })
}
