import { AppThunkType } from '../../app/store'

import { registrationApi } from './registration-api'

const LOGIN = 'LOGIN'
const ERRORS = 'ERRORS'

const initialState: stateType = {
  isLoggedIn: false,
  errors: {
    error: '',
    isEmailValid: true,
    isPassValid: true,
    passwordRegExp: '',
  },
}

export const registrationReducer = (
  state: stateType = initialState,
  action: AllActionsType
): stateType => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: action.isLoggedIn }
    case ERRORS:
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
const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: LOGIN, isLoggedIn } as const)

export const setErrors = (errors: TypeError) => ({ type: ERRORS, payload: errors } as const)

// thunk
export const registrationUser =
  (data: userData): AppThunkType =>
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

// type
type stateType = {
  isLoggedIn: boolean
  errors: TypeError
}
type AllActionsType = setIsLoggedInType | setErrorsType
type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>
type setErrorsType = ReturnType<typeof setErrors>
export type userData = {
  email: string
  password: string
}
type TypeError = {
  error: string
  isEmailValid: boolean
  isPassValid: boolean
  passwordRegExp: string
}
