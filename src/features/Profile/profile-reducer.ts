import { appSetStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/errorUtils'

import { profileApi } from './profile-api'

const initialState: ProfileInitialStateType = {
  _id: null,
  email: null,
  name: null,
  avatar: null,
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
    case 'PROFILE/SET_USER_DATA': {
      return {
        ...state,
        _id: action._id,
        email: action.email,
        name: action.name,
        avatar: action.avatar,
      }
    }
    case 'PROFILE/UPDATE_USER_DATA': {
      return { ...state, name: action.name }
    }
    case 'PROFILE/UPDATE_USER_PHOTO': {
      return { ...state, avatar: action.avatar }
    }
    default:
      return state
  }
}

// actions
export const setUserDataAC = (
  _id: string | null,
  email: string | null,
  name: string | null,
  avatar: string | null
) => ({ type: 'PROFILE/SET_USER_DATA', _id, email, name, avatar } as const)

export const updateUserDataAC = (name: string | null) =>
  ({ type: 'PROFILE/UPDATE_USER_DATA', name } as const)

export const updateUserPhotoAC = (avatar: string | null) =>
  ({ type: 'PROFILE/UPDATE_USER_PHOTO', avatar } as const)

// thunks
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
        handleServerNetworkError(e, dispatch)
      })
  }

export const updateUserPhotoTC =
  (avatar: string): AppThunkType =>
  dispatch => {
    dispatch(appSetStatusAC('loading'))
    profileApi
      .updateUserPhoto(avatar)
      .then(() => {
        dispatch(updateUserPhotoAC(avatar))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

// types
export type ProfileInitialStateType = {
  _id: string | null
  email: string | null
  name: string | null
  avatar: string | null
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
  | ReturnType<typeof updateUserPhotoAC>
