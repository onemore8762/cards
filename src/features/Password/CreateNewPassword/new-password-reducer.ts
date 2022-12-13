import { AppThunkType } from '../../../app/store'

import { passwordApi } from './new-password-api'

const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD'
const SET_ERROR = 'SET_ERROR'

const initialState: stateType = {
  onSuccess: false,
  error: '',
}

export const newPasswordReducer = (
  state: stateType = initialState,
  action: AllActionsType
): stateType => {
  switch (action.type) {
    case SET_NEW_PASSWORD:
      return { ...state, onSuccess: action.onSuccess }
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}
// actions
const setPasswordSuccess = (onSuccess: boolean) => ({ type: SET_NEW_PASSWORD, onSuccess } as const)
const setPasswordError = (error: string) => ({ type: SET_ERROR, error } as const)

// thunk
export const setNewPassword =
  (data: setPasswordType): AppThunkType =>
  dispatch => {
    passwordApi
      .setNewPassword(data)
      .then(() => {
        dispatch(setPasswordSuccess(true))
      })
      .catch(error => {
        dispatch(setPasswordError(error.response.data.error))
      })
  }

// type
type stateType = {
  onSuccess: boolean
  error: string
}
type AllActionsType = SetIsLoggedInType | setPasswordErrorType
type SetIsLoggedInType = ReturnType<typeof setPasswordSuccess>
type setPasswordErrorType = ReturnType<typeof setPasswordError>
export type setPasswordType = {
  password: string
  resetPasswordToken: string
}
