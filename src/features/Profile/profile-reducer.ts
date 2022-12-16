import { appSetStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { setErrorAC } from '../Login/login-reducer'

import { profileApi } from './profile-api'

const initialState: ProfileInitialStateType = {
  _id: null,
  email: null,
  name: null,
  // avatar: null,
  publicCardPacksCount: 0, // количество колод

  // created: null,
  // updated: null,
  isAdmin: false,
  verified: false, // подтвердил ли почту
  rememberMe: false,
}

// reducer
export const profileReducer = (
  state: ProfileInitialStateType = initialState,
  action: ProfileActionType
): ProfileInitialStateType => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return { ...state, name: action.name }
    }
    case 'SET_USER_DATA': {
      return {
        ...state,
        _id: action._id,
        email: action.email,
        name: action.name,
      }
    }
    default:
      return state
  }
}

// actions
export const setUserDataAC = (_id: string | null, email: string | null, name: string | null) =>
  ({ type: 'SET_USER_DATA', _id, email, name } as const)

export const updateUserDataAC = (name: string | null) =>
  ({ type: 'UPDATE_USER_DATA', name } as const)

// thunk
export const updateUserDataTC =
  (name: string): AppThunkType =>
  dispatch => {
    dispatch(appSetStatusAC('loading'))
    profileApi
      .updateUserData(name)
      .then(() => {
        dispatch(updateUserDataAC(name))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
        dispatch(setErrorAC(error))
        dispatch(appSetStatusAC('failed'))
      })
  }

// types
export type ProfileInitialStateType = {
  _id: string | null
  email: string | null
  name: string | null
  // avatar?: string | null
  publicCardPacksCount: number // количество колод

  // created: string | null
  // updated: string | null
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

export type ProfileActionType =
  | ReturnType<typeof setUserDataAC>
  | ReturnType<typeof updateUserDataAC>
