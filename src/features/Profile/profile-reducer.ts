import { Dispatch } from 'redux'

import { profileApi } from './profile-api'

const initialState: ProfileInitialStateType = {
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

  error: '',
}

export const profileReducer = (
  state: ProfileInitialStateType = initialState,
  action: ProfileActionTypes
): ProfileInitialStateType => {
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
      }
    }
    case 'UPDATE_USER_DATA': {
      return { ...state, name: action.name }
    }
    default:
      return state
  }
}

//action
const setAuthUserDataAC = (
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
  } as const)

const updateUserDataAC = (name: string) => ({ type: 'UPDATE_USER_DATA', name } as const)

//thunk
export const setAuthUserDataTC = () => {
  return (dispatch: Dispatch<ProfileActionTypes>) => {
    profileApi
      .setUserData()
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

export const updateUserDataTC = (name: string) => {
  return (dispatch: Dispatch<ProfileActionTypes>) => {
    profileApi
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

//type
type ProfileActionTypes = ReturnType<typeof updateUserDataAC> | ReturnType<typeof setAuthUserDataAC>

type ProfileInitialStateType = {
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
