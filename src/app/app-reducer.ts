import { Dispatch } from 'redux'

import { authApi } from '../features/Auth/auth-api'
import { loginAC } from '../features/Login/login-reducer'

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

// action
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
export const initializeAppTC = () => {
  return (dispatch: Dispatch /*<AppInitialStateStatusType & LoginActionType>*/) => {
    dispatch(appSetStatusAC('loading'))
    authApi
      .authMe()
      .then(res => {
        // if (res.data.resultCode === 0) {
        dispatch(loginAC(true))
        dispatch(appSetStatusAC('succeeded'))
        dispatch(appSetInitializedAC(true))
        // } else {
        // handleServerAppError(response.data, dispatch);
        // if (response.data.messages) {
        //     dispatch(appSetErrorAC(response.data.messages[0]));
        // } else {
        //     dispatch(appSetErrorAC('Some Error'));
        // }
      })
      // dispatch(appSetInitializedAC(true))
      // })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
        // handleServerNetworkError(error, dispatch);
        // dispatch(appSetErrorAC(error.message));
        // dispatch(appSetStatusAC('failed'));
      })
  }
}

// type
type AppInitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: AppInitialStateStatusType
  // текст ошибки запишем сюда
  error: string | null
  isInitialized: boolean
}

type AppInitialStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ApplicationActionType =
  | ReturnType<typeof appSetStatusAC>
  | ReturnType<typeof appSetErrorAC>
  | ReturnType<typeof appSetInitializedAC>