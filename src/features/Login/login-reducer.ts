import { Dispatch } from 'redux'

import { appSetInitializedAC, appSetStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'

import { loginApi, LoginParamsType } from './login-api'

const initialState: LoginInitialStateType = {
  isLoggedIn: false,
  error: '',
}

// reducer
export const loginReducer = (
  state: LoginInitialStateType = initialState,
  action: LoginActionType
): LoginInitialStateType => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, isLoggedIn: action.isLoggedIn }
    }
    case 'SET-ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

//actions
export const loginAC = (isLoggedIn: boolean) => ({ type: 'LOGIN', isLoggedIn } as const)
export const setErrorAC = (error: string) => ({ type: 'SET-ERROR', error } as const)

//thunk
export const loginTC = (data: LoginParamsType): AppThunkType => {
  return (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    loginApi
      .login(data)
      .then(res => {
        dispatch(loginAC(true))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        dispatch(setErrorAC(error))
        dispatch(appSetStatusAC('failed'))
      })
  }
}

export const logoutTC = (): AppThunkType => {
  return (dispatch: Dispatch) => {
    dispatch(appSetStatusAC('loading'))
    loginApi
      .logout()
      .then(res => {
        dispatch(loginAC(false))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        dispatch(setErrorAC(error))
        dispatch(appSetStatusAC('failed'))
      })
  }
}

//types
export type LoginInitialStateType = {
  isLoggedIn: boolean
  error: string
}

// @ts-ignore
export type LoginActionType = ReturnType<typeof loginAC> | ReturnType<typeof setErrorAC>
