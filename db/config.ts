import { defineDb, defineTable, column, NOW } from 'astro:db'

export const Contact = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    subject: column.text(),
    message: column.text(),
    createdAt: column.date({ default: NOW })
  }
})

export default defineDb({
  tables: { Contact }
})
