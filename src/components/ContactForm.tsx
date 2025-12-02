//import { type Contact } from '../types/types'
import { actions } from 'astro:actions'
import { useState, useReducer, useEffect } from 'react'
import type { ContactFormState } from '../types/types'
import { formReducer, initialState, ActionType } from '../reducers/formReducer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ContactForm() {
  const [formState, dispatch] = useReducer(formReducer, initialState)
  const [isInitialMount, setIsInitialMount] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false)
    } else {
      dispatch({
        type: ActionType.VALIDATE_FIELD
      })
    }
  }, [formState.fields])

  const handleCreateContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({
      type: ActionType.VALIDATE_FIELD
    })

    if (
      formState.fields.email === '' ||
      formState.fields.name === '' ||
      formState.fields.subject === '' ||
      formState.fields.message === ''
    ) {
      return false
    }

    if (errorsExists()) {
      toast.error('Todos los campos son requeridos.', {
        position: 'bottom-center'
      })
      return false
    }

    setSubmitting(true)
    const { data, error } = await actions.send({
      name: formState.fields.name,
      email: formState.fields.email,
      subject: formState.fields.subject,
      message: formState.fields.message
    })

    if (error) {
      toast.error(error.message, { position: 'bottom-center' })
      setSubmitting(false)
      return
    }

    toast.success('Mensaje enviado', { position: 'bottom-center' })
    setIsInitialMount(true)
    dispatch({ type: ActionType.RESET_FORM })
    setSubmitting(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    dispatch({
      type: ActionType.UPDATE_FIELD,
      field: name,
      value: value.trimStart()
    })
  }

  const errorsExists = () => {
    return Object.keys(formState.validationErrors).some((key) => {
      return formState.validationErrors[key] !== ''
    })
  }

  return (
    <>
      <form onSubmit={handleCreateContact} className='space-y-5'>
        <div>
          <label
            htmlFor='name'
            className='flex items-center gap-2 mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'
          >
            Nombre
            <span className='text-red-500' aria-hidden='true'>
              *
            </span>
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formState.fields.name}
            onChange={handleInputChange}
            required
            aria-invalid={!!formState.validationErrors?.name}
            aria-describedby='name-error'
            className={`bg-zinc-50 border text-zinc-700 text-sm rounded-md block w-full px-3 py-2.5 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-zinc-100
              outline-none transition shadow-sm
              ${
                formState.validationErrors?.name
                  ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900'
                  : 'border-zinc-300 focus:ring-2 focus:ring-sky-300 dark:border-zinc-700 dark:focus:ring-sky-700'
              }`}
            placeholder='Su nombre completo'
          />
          {formState.validationErrors?.name && (
            <p
              id='name-error'
              className='mt-1 text-sm text-red-600 flex items-start gap-1'
            >
              <svg
                className='w-4 h-4 mt-0.5 shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.5a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5zM10 14a1 1 0 100 2 1 1 0 000-2z'
                  clipRule='evenodd'
                />
              </svg>
              {formState.validationErrors?.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor='email'
            className='flex items-center gap-2 mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'
          >
            Email
            <span className='text-red-500' aria-hidden='true'>
              *
            </span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formState.fields.email}
            onChange={handleInputChange}
            required
            aria-invalid={!!formState.validationErrors.email}
            aria-describedby='email-error'
            className={`bg-zinc-50 border text-zinc-700 text-sm rounded-md block w-full px-3 py-2.5 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-zinc-100
              outline-none transition shadow-sm
              ${
                formState.validationErrors.email
                  ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900'
                  : 'border-zinc-300 focus:ring-2 focus:ring-sky-300 dark:border-zinc-700 dark:focus:ring-sky-700'
              }`}
            placeholder='micorreo@gmail.com'
          />
          {formState.validationErrors.email && (
            <p
              id='email-error'
              className='mt-1 text-sm text-red-600 flex items-start gap-1'
            >
              <svg
                className='w-4 h-4 mt-0.5 shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.5a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5zM10 14a1 1 0 100 2 1 1 0 000-2z'
                  clipRule='evenodd'
                />
              </svg>
              {formState.validationErrors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor='subject'
            className='flex items-center gap-2 mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'
          >
            Asunto
            <span className='text-red-500' aria-hidden='true'>
              *
            </span>
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={formState.fields.subject}
            onChange={handleInputChange}
            required
            aria-invalid={!!formState.validationErrors.subject}
            aria-describedby='subject-error'
            className={`bg-zinc-50 border text-zinc-700 text-sm rounded-md block w-full px-3 py-2.5 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:text-zinc-100
              outline-none transition shadow-sm
              ${
                formState.validationErrors.subject
                  ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900'
                  : 'border-zinc-300 focus:ring-2 focus:ring-sky-300 dark:border-zinc-700 dark:focus:ring-sky-700'
              }`}
            placeholder='¿En que puedo ayudarte?'
          />
          {formState.validationErrors.subject && (
            <p
              id='subject-error'
              className='mt-1 text-sm text-red-600 flex items-start gap-1'
            >
              <svg
                className='w-4 h-4 mt-0.5 shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.5a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5zM10 14a1 1 0 100 2 1 1 0 000-2z'
                  clipRule='evenodd'
                />
              </svg>
              {formState.validationErrors.subject}
            </p>
          )}
        </div>
        <div className='sm:col-span-2'>
          <label
            htmlFor='message'
            className='flex items-center gap-2 mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300'
          >
            Mensaje
            <span className='text-red-500' aria-hidden='true'>
              *
            </span>
          </label>
          <textarea
            id='message'
            name='message'
            value={formState.fields.message}
            onChange={handleInputChange}
            rows={6}
            required
            aria-invalid={!!formState.validationErrors.message}
            aria-describedby='message-error'
            className={`block w-full text-sm rounded-md px-3 py-2.5 bg-zinc-50 border text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100
              outline-none transition shadow-sm min-h-[140px]
              ${
                formState.validationErrors.message
                  ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-900'
                  : 'border-zinc-300 focus:ring-2 focus:ring-sky-300 dark:border-zinc-700 dark:focus:ring-sky-700'
              }`}
            placeholder='Escribe tus ideas...'
          ></textarea>
          {formState.validationErrors.message && (
            <p
              id='message-error'
              className='mt-1 text-sm text-red-600 flex items-start gap-1'
            >
              <svg
                className='w-4 h-4 mt-0.5 shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-11.5a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5zM10 14a1 1 0 100 2 1 1 0 000-2z'
                  clipRule='evenodd'
                />
              </svg>
              {formState.validationErrors.message}
            </p>
          )}
        </div>

        <div className='flex items-center justify-between pt-2'>
          <p className='text-xs text-zinc-500 dark:text-zinc-400'>
            <span className='text-red-500'>*</span> Campos obligatorios
          </p>
          <button
            type='submit'
            disabled={submitting}
            className={`inline-flex items-center gap-2 text-white bg-zinc-800 hover:bg-zinc-700 font-medium rounded-md text-sm px-5 py-2.5 mb-2 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-zinc-700 dark:hover:bg-zinc-600`}
          >
            {submitting && (
              <svg
                className='w-4 h-4 animate-spin'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden='true'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                ></path>
              </svg>
            )}
            {submitting ? 'Enviando…' : 'Enviar'}
          </button>
        </div>

        <ToastContainer />
      </form>
    </>
  )
}
