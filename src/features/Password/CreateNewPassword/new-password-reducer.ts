import { AppThunkType } from '../../../app/store'

import { passwordApi } from './new-password-api'

const initialState: NewPasswordStateType = {
  onSuccess: false,
  error: '',
}

// reducer
export const newPasswordReducer = (
  state: NewPasswordStateType = initialState,
  action: NewPasswordActionType
): NewPasswordStateType => {
  switch (action.type) {
    case 'NEW_PASSWORD/SET_NEW_PASSWORD':
      return { ...state, onSuccess: action.onSuccess }
    case 'NEW_PASSWORD/SET_ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}
// actions
export const setPasswordSuccess = (onSuccess: boolean) =>
  ({ type: 'NEW_PASSWORD/SET_NEW_PASSWORD', onSuccess } as const)
export const setPasswordError = (error: string) =>
  ({ type: 'NEW_PASSWORD/SET_ERROR', error } as const)

// thunks
export const setNewPassword =
  (data: SetPasswordType): AppThunkType =>
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

// types
export type NewPasswordStateType = {
  onSuccess: boolean
  error: string
}

export type SetPasswordType = {
  password: string
  resetPasswordToken: string
}

export type NewPasswordActionType =
  | ReturnType<typeof setPasswordSuccess>
  | ReturnType<typeof setPasswordError>
