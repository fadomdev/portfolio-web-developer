import type { ContactFormState } from '../types/types'

// Paso 1: Definir Tipos de Acciones
enum ActionType {
  UPDATE_FIELD = 'UPDATE_FIELD',
  VALIDATE_FIELD = 'VALIDATE_FIELD',
  RESET_FORM = 'RESET_FORM'
}

// Definir el tipo para las acciones
type Action =
  | { type: ActionType.UPDATE_FIELD; field: string; value: string }
  | { type: ActionType.VALIDATE_FIELD; field?: string }
  | { type: ActionType.RESET_FORM }

const initialState: ContactFormState = {
  fields: {
    name: '',
    email: '',
    subject: '',
    message: ''
    // Otros campos según sea necesario
  },
  validationErrors: {}
}

// Paso 3: Reducer
const formReducer = (
  state: ContactFormState,
  action: Action
): ContactFormState => {
  switch (action.type) {
    case ActionType.UPDATE_FIELD:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: action.value
        }
      }
    case ActionType.VALIDATE_FIELD:
      if (!action.field) {
        const newValidationErrors: {
          [key: string]: string
        } = {}

        for (const key in state.fields) {
          newValidationErrors[key] = validateField(key, state.fields[key])
        }

        return {
          ...state,
          validationErrors: newValidationErrors
        }
      }

      const errorMessage = validateField(
        action.field,
        state.fields[action.field]
      )

      return {
        ...state,
        validationErrors: {
          ...state.validationErrors,
          [action.field]: errorMessage
        }
      }
    case ActionType.RESET_FORM:
      return initialState
    default:
      return state
  }
}

// Paso 4: Validaciones
const validateField = (field: string, value: string): string => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

  if (field === 'email' && !emailRegex.test(value)) {
    return 'El correo electrónico es inválido.'
  }

  if (field === 'name' && value.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres.'
  }

  if (field === 'subject' && value.length < 5) {
    return 'El asunto debe tener al menos 5 caracteres.'
  }

  if (field === 'message' && value.length < 10) {
    return 'El mensaje debe tener al menos 10 caracteres.'
  }

  return ''
}

export { formReducer, initialState, ActionType }
