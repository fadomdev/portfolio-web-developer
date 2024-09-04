interface Contact {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormState {
  fields: Contact
  validationErrors: {
    [key: string]: string
  }
}

export type { Contact, ContactFormState }
