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
  const onSuccess = true
  const endState = newPasswordReducer(startState, setPasswordSuccess(onSuccess))

  expect(endState.onSuccess).toBe(true)
})
