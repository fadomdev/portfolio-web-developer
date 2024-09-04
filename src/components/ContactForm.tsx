//import { type Contact } from '../types/types'
import { useState, useReducer, useEffect, useRef } from 'react'
import type { ContactFormState } from '../types/types'
import { formReducer, initialState, ActionType } from '../reducers/formReducer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ContactForm() {
  const [formState, dispatch] = useReducer(formReducer, initialState)
  const [isInitialMount, setIsInitialMount] = useState(true)

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

    await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formState.fields.name,
        email: formState.fields.email,
        subject: formState.fields.subject,
        message: formState.fields.message
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.error) {
          toast.error(data.error[0].message, {
            position: 'bottom-center'
          })
        } else {
          toast.success('Mensaje enviado', {
            position: 'bottom-center'
          })

          setIsInitialMount(true)

          dispatch({
            type: ActionType.RESET_FORM
          })
        }
      })
      .catch((error) => {
        toast(error)
      })
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
      <form onSubmit={handleCreateContact} className='space-y-4'>
        <div>
          <label
            htmlFor='name'
            className='block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formState.fields.name}
            onChange={handleInputChange}
            className='outline-zinc-300 bg-zinc-50 border border-zinc-300 text-zinc-600 text-sm rounded-sm block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white'
            placeholder='Su nombre completo'
          />
          {formState.validationErrors?.name && (
            <p className='text-red-500 text-sm'>
              {formState.validationErrors?.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor='email'
            className='block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formState.fields.email}
            onChange={handleInputChange}
            className='outline-zinc-300 bg-zinc-50 border border-zinc-300 text-zinc-600 text-sm rounded-sm block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white'
            placeholder='micorreo@gmail.com'
          />
          {formState.validationErrors.email && (
            <p className='text-red-500 text-sm'>
              {formState.validationErrors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor='subject'
            className='block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300'
          >
            Asunto
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={formState.fields.subject}
            onChange={handleInputChange}
            className='block outline-zinc-300 p-3 w-full text-sm text-zinc-600 bg-zinc-50 rounded-sm border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white'
            placeholder='¿En que puedo ayudarte?'
          />
          {formState.validationErrors.subject && (
            <p className='text-red-500 text-sm'>
              {formState.validationErrors.subject}
            </p>
          )}
        </div>
        <div className='sm:col-span-2'>
          <label
            htmlFor='message'
            className='block mb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300'
          >
            Mensaje
          </label>
          <textarea
            id='message'
            name='message'
            value={formState.fields.message}
            onChange={handleInputChange}
            rows={6}
            className='block outline-zinc-300 p-2.5 w-full text-sm text-zinc-600 bg-zinc-50 rounded-sm border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-zinc-300'
            placeholder='Escribe tus ideas...'
          ></textarea>
          {formState.validationErrors.message && (
            <p className='text-red-500 text-sm'>
              {formState.validationErrors.message}
            </p>
          )}
        </div>

        <div className='text-right'>
          <button
            type='submit'
            className='text-white bg-zinc-600 hover:bg-zinc-500 font-medium rounded-sm text-sm px-5 py-2.5 mb-2'
          >
            Enviar
          </button>
        </div>

        <ToastContainer />
      </form>
    </>
  )
}
