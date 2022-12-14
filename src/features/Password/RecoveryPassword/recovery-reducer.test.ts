import { recoveryAC, recoveryReducer, RecoveryStateType } from './recovery-reducer'

let startState: RecoveryStateType

beforeEach(() => {
  startState = {
    error: '',
    success: false,
  }
})

test('password should be recover', () => {
  const endState = recoveryReducer(startState, recoveryAC('some error', true))

  expect(endState.error).toBe('some error')
  expect(endState.success).toBe(true)
})
