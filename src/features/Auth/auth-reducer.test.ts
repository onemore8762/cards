import { loginAC, LoginInitialStateType, loginReducer, setErrorAC } from '../Login/login-reducer'

import { AuthInitialStateType, authReducer, setAuthUserDataAC } from './auth-reducer'

let startState: AuthInitialStateType

beforeEach(() => {
  startState = {
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
})

test('user should be authorized', () => {
  const action = {
    _id: '1',
    email: 'newUser@google.com',
    name: 'New User',
    // avatar: null,
    publicCardPacksCount: 0, // количество колод

    // created: Date,
    // updated: Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,

    // error: '',
  }
  const endState = authReducer(
    startState,
    setAuthUserDataAC(
      action._id,
      action.email,
      action.name,
      action.publicCardPacksCount,
      action.isAdmin,
      action.verified,
      action.rememberMe
      // action.error
    )
  )

  expect(endState._id).toBe('1')
  expect(endState._id).toBe('newUser@google.com')
  expect(endState.name).toBe('New User')
})
