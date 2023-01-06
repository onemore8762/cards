import { ProfileInitialStateType, profileReducer, setUserDataAC } from './profile-reducer'

let startState: ProfileInitialStateType

beforeEach(() => {
  startState = {
    _id: null,
    email: null,
    name: 'Enter Your Name',
    avatar: null,
    publicCardPacksCount: 0, // количество колод

    // created: null,
    // updated: null,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
  }
})

test('user should be authorized', () => {
  const action = {
    _id: '1',
    email: 'newUser@gmail.com',
    name: 'New User',
    avatar: 'New Avatar',
    publicCardPacksCount: 0, // количество колод

    // created: '2022-12-14',
    // updated: '2022-12-15',
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
  }
  const endState = profileReducer(
    startState,
    setUserDataAC(action._id, action.email, action.name, action.avatar)
  )

  expect(endState._id).toBe('1')
  expect(endState.email).toBe('newUser@gmail.com')
  expect(endState.name).toBe('New User')
})
