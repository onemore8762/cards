import { AppThunkType } from '../../app/store'

import { registrationApi } from './registration-api'

const initialState: RegistrationStateType = {
  isLoggedIn: false,
  errors: {
    error: '',
    isEmailValid: true,
    isPassValid: true,
    passwordRegExp: '',
  },
}

// reducer
export const registrationReducer = (
  state: RegistrationStateType = initialState,
  action: RegistrationActionType
): RegistrationStateType => {
  switch (action.type) {
    case 'REGISTRATION/LOGIN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    case 'ERRORS':
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

// actions
export const setIsLoggedIn = (isLoggedIn: boolean) =>
  ({ type: 'REGISTRATION/LOGIN', isLoggedIn } as const)
export const setErrors = (errors: TypeError) => ({ type: 'ERRORS', payload: errors } as const)

// thunk
export const registrationUser =
  (data: UserData): AppThunkType =>
  dispatch => {
    registrationApi
      .registration(data)
      .then(response => {
        console.log(response)
        dispatch(setIsLoggedIn(true))
      })
      .catch(error => {
        console.log(error)
        dispatch(setErrors(error.response.data))
      })
  }

// types
export type RegistrationStateType = {
  isLoggedIn: boolean
  errors: TypeError
}

export type UserData = {
  email: string
  password: string
}
type TypeError = {
  error: string
  isEmailValid: boolean
  isPassValid: boolean
  passwordRegExp: string
}

export type RegistrationActionType = ReturnType<typeof setIsLoggedIn> | ReturnType<typeof setErrors>
