import { recoveryAC, recoveryReducer, RecoveryStateType } from './recovery-reducer'

let startState: RecoveryStateType

beforeEach(() => {
  startState = {
    error: '',
    success: false,
  }
})

test('password should be recover', () => {
  const error = 'some error'
  const success = true
  const endState = recoveryReducer(startState, recoveryAC(error, success))

  expect(endState.error).toBe('some error')
  expect(endState.success).toBe(true)
})
