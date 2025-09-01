import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)
const RESEND_RECEIVER_EMAIL = import.meta.env.RESEND_RECEIVER_EMAIL

export const server = {
  send: defineAction({
    accept: 'form',
    handler: async () => {
      const { data, error } = await resend.emails.send({
        from: 'fadomdev <contact@fadom.dev>',
        to: [RESEND_RECEIVER_EMAIL],
        subject: 'Contacto desde fadom.dev',
        html: '<strong>It works!</strong>'
      })

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message
        })
      }

      return data
    }
  })
}
