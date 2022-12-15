// временная заглушка
export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return { ...state, name: action.name }
    }
    default:
      return state
  }
}

// import { Dispatch } from 'redux'
//
// import { appSetStatusAC } from '../../app/app-reducer'
// import { AppThunkType } from '../../app/store'
// import { setErrorAC } from '../Login/login-reducer'
//
// import { authApi } from './auth-api'
//
// const initialState: AuthInitialStateType = {
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
//
//   // error: '',
// }
//
// // reducer
// export const authReducer = (
//   state: AuthInitialStateType = initialState,
//   action: AuthActionType
// ): AuthInitialStateType => {
//   switch (action.type) {
//     case 'SET_AUTH_USER_DATA': {
//       return {
//         ...state,
//         _id: action._id,
//         email: action.email,
//         name: action.name,
//         // avatar: action.avatar,
//         publicCardPacksCount: action.publicCardPacksCount,
//         // created: action.created,
//         // updated: action.updated,
//         isAdmin: action.isAdmin,
//         verified: action.verified,
//         rememberMe: action.rememberMe,
//         // error: action.error,
//       }
//     }
//     case 'UPDATE_USER_DATA': {
//       return { ...state, name: action.name }
//     }
//     default:
//       return state
//   }
// }
//
// //actions
// export const setAuthUserDataAC = (
//   _id: string | null,
//   email: string | null,
//   name: string,
//   // avatar: string | null,
//   publicCardPacksCount: number,
//   // created: string | null,
//   // updated: string | null,
//   isAdmin: boolean,
//   verified: boolean,
//   rememberMe: boolean
//   // error: string
// ) =>
//   ({
//     type: 'SET_AUTH_USER_DATA',
//     _id,
//     email,
//     name,
//     // avatar,
//     publicCardPacksCount,
//     isAdmin,
//     // created,
//     // updated,
//     verified,
//     rememberMe,
//     // error,
//   } as const)
//
// const updateUserDataAC = (name: string) => ({ type: 'UPDATE_USER_DATA', name } as const)
//
// //thunk
// export const setAuthUserDataTC = (): AppThunkType => {
//   return (dispatch: Dispatch) => {
//     authApi
//       .authMe()
//       .then(res => {
//         let {
//           _id,
//           email,
//           name,
//           // avatar,
//           publicCardPacksCount,
//           // created,
//           // updated,
//           isAdmin,
//           verified,
//           rememberMe,
//           // error,
//         } = res.data
//
//         dispatch(
//           setAuthUserDataAC(
//             _id,
//             email,
//             name,
//             // avatar,
//             publicCardPacksCount,
//             // created,
//             // updated,
//             isAdmin,
//             verified,
//             rememberMe
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
//
// export const updateUserDataTC = (name: string): AppThunkType => {
//   return (dispatch: Dispatch) => {
//     dispatch(appSetStatusAC('loading'))
//     authApi
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
//
// //types
// export type AuthInitialStateType = {
//   _id: string | null
//   email: string | null
//   name: string | null
//   // avatar?: string | null
//   publicCardPacksCount: number // количество колод
//
//   // created: string | null
//   // updated: string | null
//   isAdmin: boolean
//   verified: boolean // подтвердил ли почту
//   rememberMe: boolean
//
//   error?: string
// }
//
// export type AuthActionType =
//   | ReturnType<typeof updateUserDataAC>
//   | ReturnType<typeof setAuthUserDataAC>
