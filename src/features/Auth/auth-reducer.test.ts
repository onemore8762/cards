import { authReducer } from './auth-reducer'

// let startState: AuthInitialStateType
//
// beforeEach(() => {
//   startState = {
//     _id: null,
//     email: null,
//     name: 'Enter Your Name',
//     // avatar: null,
//     publicCardPacksCount: 0, // количество колод
//
//     // created: null,
//     // updated: null,
//     isAdmin: false,
//     verified: false, // подтвердил ли почту
//     rememberMe: false,
//
//     // error: '',
//   }
// })
//
// test('user should be authorized', () => {
//   const action = {
//     _id: '1',
//     email: 'newUser@google.com',
//     name: 'New User',
//     // avatar: null,
//     publicCardPacksCount: 0, // количество колод
//
//     // created: '2022-12-14',
//     // updated: '2022-12-15',
//     isAdmin: false,
//     verified: false, // подтвердил ли почту
//     rememberMe: false,
//
//     // error: '',
//   }
//   const endState = authReducer(
//     startState,
//     setAuthUserDataAC(
//       action._id,
//       action.email,
//       action.name,
//       action.publicCardPacksCount,
//       // action.created,
//       // action.updated,
//       action.isAdmin,
//       action.verified,
//       action.rememberMe
//       // action.error
//     )
//   )
//
//   expect(endState._id).toBe('1')
//   expect(endState._id).toBe('newUser@gmail.com')
//   expect(endState.name).toBe('New User')
// })
