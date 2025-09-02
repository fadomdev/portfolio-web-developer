interface Params {
  name: string
  email: string
  subject: string
  message: string
  siteName?: string
}
export function buildContactEmail({
  name,
  email,
  subject,
  message,
  siteName = 'fadom.dev'
}: Params) {
  const safe = esc
  const html = `<!DOCTYPE html><html><body>
  <h2>Nuevo mensaje de contacto – ${safe(siteName)}</h2>
  <p><b>Nombre:</b> ${safe(name)}</p>
  <p><b>Email:</b> ${safe(email)}</p>
  <p><b>Asunto:</b> ${safe(subject)}</p>
  <pre style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:6px">${safe(
    message
  )}</pre>
  <p style="font-size:12px;color:#666">Enviado automáticamente.</p>
  </body></html>`
  const text = `Nuevo mensaje de contacto - ${siteName}
Nombre: ${name}
Email: ${email}
Asunto: ${subject}

${message}
`
  return { html, text }
}
function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
