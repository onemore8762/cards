import { Dispatch } from 'redux'

import { AppThunkType } from '../../app/store'

import { authApi } from './auth-api'

const initialState: AuthInitialStateType = {
  _id: '',
  email: '',
  name: 'Enter Your Name',
  // avatar: null,
  publicCardPacksCount: 0, // количество колод

  // created: Date,
  // updated: Date,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,

  // error: '',
}

// reducer
export const authReducer = (
  state: AuthInitialStateType = initialState,
  action: AuthActionType
): AuthInitialStateType => {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA': {
      return {
        ...state,
        _id: action._id,
        email: action.email,
        name: action.name,
        // avatar: action.avatar,
        publicCardPacksCount: action.publicCardPacksCount,
        // created: action.created,
        // updated: action.updated,
        isAdmin: action.isAdmin,
        verified: action.verified,
        rememberMe: action.rememberMe,
        // error: action.error,
      }
    }
    case 'UPDATE_USER_DATA': {
      return { ...state, name: action.name }
    }
    default:
      return state
  }
}

//actions
export const setAuthUserDataAC = (
  _id: string,
  email: string,
  name: string,
  // avatar: string | null,
  publicCardPacksCount: number,
  // created: Date,
  // updated: Date,
  isAdmin: boolean,
  verified: boolean,
  rememberMe: boolean
  // error: string
) =>
  ({
    type: 'SET_AUTH_USER_DATA',
    _id,
    email,
    name,
    // avatar,
    publicCardPacksCount,
    isAdmin,
    // created,
    // updated,
    verified,
    rememberMe,
    // error,
  } as const)

const updateUserDataAC = (name: string) => ({ type: 'UPDATE_USER_DATA', name } as const)

//thunk
export const setAuthUserDataTC = (): AppThunkType => {
  return (dispatch: Dispatch) => {
    authApi
      .authMe()
      .then(res => {
        let {
          _id,
          email,
          name,
          // avatar,
          publicCardPacksCount,
          // created,
          // updated,
          isAdmin,
          verified,
          rememberMe,
          // error,
        } = res.data

        dispatch(
          setAuthUserDataAC(
            _id,
            email,
            name,
            // avatar,
            publicCardPacksCount,
            // created,
            // updated,
            isAdmin,
            verified,
            rememberMe
            // error
          )
        )
        // console.log(res.data)
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
      })
  }
}

export const updateUserDataTC = (name: string): AppThunkType => {
  return (dispatch: Dispatch) => {
    authApi
      .updateUserData(name)
      .then(res => {
        dispatch(updateUserDataAC(name))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
      })
  }
}

//types
export type AuthInitialStateType = {
  _id: string
  email: string
  name: string
  // avatar?: string | null
  publicCardPacksCount: number // количество колод

  // created: Date
  // updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

export type AuthActionType =
  | ReturnType<typeof updateUserDataAC>
  | ReturnType<typeof setAuthUserDataAC>
