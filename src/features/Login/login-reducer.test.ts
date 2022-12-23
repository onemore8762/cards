import { loginAC, LoginInitialStateType, loginReducer, setErrorAC } from './login-reducer'

let startState: LoginInitialStateType

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    error: '',
  }
})

test('user should be logged in', () => {
  const endState = loginReducer(startState, loginAC(true))

  expect(endState.isLoggedIn).toBeTruthy()
})

test('error should be set', () => {
  const newError = 'some error'
  const endState = loginReducer(startState, setErrorAC(newError))

  expect(endState.error).toBe(newError)
})

// export default ()=> {}
