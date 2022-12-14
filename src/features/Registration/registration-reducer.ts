import { AppThunkType } from '../../app/store'

import { registrationApi } from './registration-api'

const initialState: StateType = {
  isLoggedIn: false,
  errors: {
    error: '',
    isEmailValid: true,
    isPassValid: true,
    passwordRegExp: '',
  },
}

export const registrationReducer = (
  state: StateType = initialState,
  action: AllActionsType
): StateType => {
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
const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'REGISTRATION/LOGIN', isLoggedIn } as const)

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

// type
type StateType = {
  isLoggedIn: boolean
  errors: TypeError
}
type AllActionsType = ReturnType<typeof setIsLoggedIn> | ReturnType<typeof setErrors>
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
