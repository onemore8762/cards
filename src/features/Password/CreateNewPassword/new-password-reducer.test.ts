import {
  newPasswordReducer,
  NewPasswordStateType,
  setPasswordSuccess,
} from './new-password-reducer'

let startState: NewPasswordStateType

beforeEach(() => {
  startState = {
    onSuccess: false,
    error: '',
  }
})

test('new password should be received', () => {
  const endState = newPasswordReducer(startState, setPasswordSuccess(true))

  expect(endState.onSuccess).toBe(true)
})
