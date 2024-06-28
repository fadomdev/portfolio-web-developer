import { createContact, getAllContacts } from '../lib/contact'
import { type Contact } from '../types/types'

export default function ContactForm() {
  const handleCreateContact = async () => {
    console.log('Creating contact...')

    const data: Contact = {
      name: 'Francisco Aquino',
      email: 'franciscoaquino19@gmail.com',
      subject: 'Prueba de contacto',
      message: 'Este es un mensaje x'
    }

    await createContact(data)
  }

  const handleGetAllContacts = async () => {
    console.log('Getting all contacts...')

    const data = await getAllContacts()
    console.log(data)
  }

  return (
    <>
      <form action='#' className='space-y-8'>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-stone-600 dark:text-stone-300'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='outline-stone-300 bg-stone-50 border border-stone-300 text-stone-600 text-sm rounded-sm block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white'
            placeholder='micorreo@gmail.com'
            required
          />
        </div>
        <div>
          <label
            htmlFor='subject'
            className='block mb-2 text-sm font-medium text-stone-600 dark:text-stone-300'
          >
            Asunto
          </label>
          <input
            type='text'
            id='subject'
            className='block outline-stone-300 p-3 w-full text-sm text-stone-600 bg-stone-50 rounded-sm border border-stone-300 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white'
            placeholder='¿En que puedo ayudarte?'
            required
          />
        </div>
        <div className='sm:col-span-2'>
          <label
            htmlFor='message'
            className='block mb-2 text-sm font-medium text-stone-600 dark:text-stone-300'
          >
            Mensaje
          </label>
          <textarea
            id='message'
            rows={6}
            className='block outline-stone-300 p-2.5 w-full text-sm text-stone-600 bg-stone-50 rounded-sm border border-stone-300 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-stone-300'
            placeholder='Escribe tus ideas...'
          ></textarea>

          <button
            type='button'
            onClick={handleCreateContact}
            className='text-white bg-stone-600 hover:bg-stone-500 font-medium rounded-sm text-sm px-5 py-2.5 mb-2'
          >
            Enviar
          </button>
        </div>
      </form>
      <button
        type='button'
        onClick={handleGetAllContacts}
        className='text-white bg-stone-600 hover:bg-stone-500 font-medium rounded-sm text-sm px-5 py-2.5 mb-2'
      >
        Mostrar
      </button>
    </>
  )
}
