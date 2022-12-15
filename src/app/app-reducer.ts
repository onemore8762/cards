import { Dispatch } from 'redux'

// import { authApi } from '../features/Auth/auth-api'
import { loginApi } from '../features/Login/login-api'
import { loginAC } from '../features/Login/login-reducer'

import { AppThunkType } from './store'

const initialState: AppInitialStateType = {
  status: 'idle', // idle - начальное значение (простаивание)
  error: null,
  isInitialized: false,
}

// reducer
export const appReducer = (
  state: AppInitialStateType = initialState,
  action: ApplicationActionType
): AppInitialStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET_ERROR': {
      return { ...state, error: action.error }
    }
    case 'APP/SET_INITIALIZED': {
      return { ...state, isInitialized: action.isInitialized }
    }
    default:
      return { ...state }
  }
}

// actions
export const appSetStatusAC = (status: AppInitialStateStatusType) =>
  ({
    type: 'APP/SET_STATUS',
    status,
  } as const)

export const appSetErrorAC = (error: string | null) =>
  ({
    type: 'APP/SET_ERROR',
    error,
  } as const)

export const appSetInitializedAC = (isInitialized: boolean) =>
  ({
    type: 'APP/SET_INITIALIZED',
    isInitialized,
  } as const)

// thunk
export const initializeAppTC = (): AppThunkType => {
  return (dispatch: Dispatch) => {
    // dispatch(appSetStatusAC('loading'))
    loginApi
      .authMe()
      .then(res => {
        // if (res.data.resultCode === 0) {
        dispatch(loginAC(true))
      })
      // dispatch(appSetInitializedAC(true))
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
        // handleServerNetworkError(error, dispatch);
        dispatch(appSetErrorAC(error))
        dispatch(appSetStatusAC('failed'))
      })
    dispatch(appSetInitializedAC(true))
  }
}

// types
export type AppInitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: AppInitialStateStatusType
  // текст ошибки запишем сюда
  error: string | null
  isInitialized: boolean
}

export type AppInitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ApplicationActionType =
  | ReturnType<typeof appSetStatusAC>
  | ReturnType<typeof appSetErrorAC>
  | ReturnType<typeof appSetInitializedAC>
