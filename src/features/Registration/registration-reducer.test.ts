import { registrationReducer, RegistrationStateType, setIsLoggedIn } from './registration-reducer'

let startState: RegistrationStateType

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    errors: {
      error: '',
      isEmailValid: true,
      isPassValid: true,
      passwordRegExp: '',
    },
  }
})

test('user should be registered', () => {
  const endState = registrationReducer(startState, setIsLoggedIn(true))

  expect(endState.isLoggedIn).toBeTruthy()
})
