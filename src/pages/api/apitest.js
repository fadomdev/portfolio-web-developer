import mysql from 'mysql2/promise'

export async function GET({ params, request }) {
  return new Response(
    JSON.stringify({
      name: 'Astro',
      url: 'https://astro.build/'
    })
  )
}

export async function getAstroData({ params, request }) {
  return new Response(
    JSON.stringify({
      name: 'Astro',
      url: 'https://astro.build/'
    })
  )
}

export async function getShortLinks({ params, request }) {
  import.meta.env.DATABASE_URL
  const connection = await mysql.createConnection(import.meta.env.DATABASE_URL)
  const [rows] = await connection.query('SELECT * FROM shortlinks')

  await connection.end()
  return new Response(JSON.stringify({ data: rows }))
}
