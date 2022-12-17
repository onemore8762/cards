import { appSetStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { handleServerNetworkError } from '../../common/utils/errorUtils/errorUtils'
import { setUserDataAC } from '../Profile/profile-reducer'

import { loginApi, LoginParamsType } from './login-api'

const initialState: LoginInitialStateType = {
  isLoggedIn: false,
  error: '',

  // profile: {
  //   _id: null,
  //   email: null,
  //   name: null,
  //   // avatar: null,
  //   publicCardPacksCount: 0, // количество колод
  //
  //   // created: null,
  //   // updated: null,
  //   isAdmin: false,
  //   verified: false, // подтвердил ли почту
  //   rememberMe: false,
  // },
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
    // case 'SET_USER_DATA': {
    //   return {
    //     ...state,
    //     profile: { ...state.profile, _id: action._id, email: action.email, name: action.name },
    //   }
    // }
    // case 'UPDATE_USER_DATA': {
    //   return { ...state, profile: { ...state.profile, name: action.name } }
    // }
    default:
      return state
  }
}

// actions
export const loginAC = (isLoggedIn: boolean) => ({ type: 'LOGIN/SET_LOGIN', isLoggedIn } as const)
export const setErrorAC = (error: string) => ({ type: 'LOGIN/SET_ERROR', error } as const)
// export const setUserDataAC = (_id: string | null, email: string | null, name: string | null) =>
//   ({ type: 'SET_USER_DATA', _id, email, name } as const)
// export const updateUserDataAC = (name: string | null) =>
//   ({ type: 'UPDATE_USER_DATA', name } as const)

// thunk
export const loginTC =
  (data: LoginParamsType): AppThunkType =>
  dispatch => {
    dispatch(appSetStatusAC('loading'))
    loginApi
      .login(data)
      .then(res => {
        dispatch(loginAC(true))
        dispatch(setUserDataAC(res.data._id, res.data.email, res.data.name))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        // const error = e.response
        //   ? e.response.data.error
        //   : e.message + ', more details in the console'
        //
        // dispatch(setErrorAC(error))
        // dispatch(appSetStatusAC('failed'))
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
      // const error = e.response ? e.response.data.error : e.message + ', more details in the console'
      //
      // dispatch(setErrorAC(error))
      // dispatch(appSetStatusAC('failed'))
      handleServerNetworkError(e, dispatch)
    })
}

// export const setUserDataTC = (): AppThunkType => {
//   return (dispatch: Dispatch) => {
//     loginApi
//       .authMe()
//       .then(res => {
//         let {
//           _id,
//           email,
//           name,
//           // avatar,
//           // publicCardPacksCount,
//           // created,
//           // updated,
//           // isAdmin,
//           // verified,
//           // rememberMe,
//           // error,
//         } = res.data
//
//         dispatch(
//           setUserDataAC(
//             _id,
//             email,
//             name
//             // avatar,
//             // publicCardPacksCount,
//             // created,
//             // updated,
//             // isAdmin,
//             // verified,
//             // rememberMe
//             // error
//           )
//         )
//         // console.log(res.data)
//       })
//       .catch(e => {
//         const error = e.response
//           ? e.response.data.error
//           : e.message + ', more details in the console'
//
//         console.log(error)
//       })
//   }
// }

// export const updateUserDataTC = (name: string): AppThunkType => {
//   return (dispatch: Dispatch) => {
//     dispatch(appSetStatusAC('loading'))
//     loginApi
//       .updateUserData(name)
//       .then(res => {
//         dispatch(updateUserDataAC(name))
//         dispatch(appSetStatusAC('succeeded'))
//       })
//       .catch(e => {
//         const error = e.response
//           ? e.response.data.error
//           : e.message + ', more details in the console'
//
//         console.log(error)
//         dispatch(setErrorAC(error))
//         dispatch(appSetStatusAC('failed'))
//       })
//   }
// }

// types
export type LoginInitialStateType = {
  isLoggedIn: boolean
  error: string
  // profile: {
  //   _id: null | string
  //   email: null | string
  //   name: null | string
  //   // avatar?: null,
  //   publicCardPacksCount: number // количество колод
  //
  //   // created: Date,
  //   // updated: Date,
  //   isAdmin: boolean
  //   verified: boolean // подтвердил ли почту
  //   rememberMe: boolean
  // }
}

export type LoginActionType = ReturnType<typeof loginAC> | ReturnType<typeof setErrorAC>
// | ReturnType<typeof setUserDataAC>
// | ReturnType<typeof updateUserDataAC>
