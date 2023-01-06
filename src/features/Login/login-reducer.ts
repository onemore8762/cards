import { appSetStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/errorUtils'
import { setUserDataAC } from '../Profile/profile-reducer'

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
    case 'LOGIN/SET_LOGIN': {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      }
    }
    case 'LOGIN/SET_ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

// actions
export const loginAC = (isLoggedIn: boolean) => ({ type: 'LOGIN/SET_LOGIN', isLoggedIn } as const)
export const setErrorAC = (error: string) => ({ type: 'LOGIN/SET_ERROR', error } as const)

// thunks
export const loginTC =
  (data: LoginParamsType): AppThunkType =>
  dispatch => {
    dispatch(appSetStatusAC('loading'))
    loginApi
      .login(data)
      .then(res => {
        dispatch(loginAC(true))
        dispatch(setUserDataAC(res.data._id, res.data.email, res.data.name, res.data.avatar))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const logoutTC = (): AppThunkType => dispatch => {
  dispatch(appSetStatusAC('loading'))
  loginApi
    .logout()
    .then(() => {
      dispatch(loginAC(false))
      dispatch(appSetStatusAC('succeeded'))
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
}

// types
export type LoginInitialStateType = {
  isLoggedIn: boolean
  error: string
}

export type LoginActionType = ReturnType<typeof loginAC> | ReturnType<typeof setErrorAC>
