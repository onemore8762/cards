import { handleServerNetworkError } from '../common/utils/errorUtils'
import { loginApi } from '../features/Login/login-api'
import { loginAC } from '../features/Login/login-reducer'
import { setUserDataAC } from '../features/Profile/profile-reducer'

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

// thunks
export const initializeAppTC = (): AppThunkType => dispatch => {
  loginApi
    .authMe()
    .then(res => {
      dispatch(loginAC(true))
      dispatch(setUserDataAC(res.data._id, res.data.email, res.data.name, res.data.avatar))
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
    .finally(() => {
      dispatch(appSetInitializedAC(true))
    })
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
