import { registrationApi } from './registration-api'

const LOGIN = 'LOGIN'
const initialState: stateType = {
  isLoggedIn: false,
  errors: {
    error: '',
    isEmailValid: false,
    isPassValid: false,
    passwordRegExp: '',
  },
}

export const registrationReducer = (
  state: stateType = initialState,
  action: setIsLoggedInType
): stateType => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}
// actions
const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: LOGIN, isLoggedIn } as const)
const setErrors = (errors: TypeError) =>
  ({
    type: LOGIN,
    error: errors.error,
    isEmailValid: errors.isEmailValid,
    isPassValid: errors.isPassValid,
    passwordRegExp: errors.passwordRegExp,
  } as const)

// thunk
export const registrationUser = (data: userData) => (dispatch: any) => {
  registrationApi
    .registration(data)
    .then(response => {
      console.log(response)
      dispatch(setIsLoggedIn(true))
    })
    .catch(error => {
      dispatch(setErrors(error.response.data))
    })
}

// type
type stateType = {
  isLoggedIn: boolean
  errors: {
    error: string
    isEmailValid: boolean
    isPassValid: boolean
    passwordRegExp: ''
  }
}
type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>
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
