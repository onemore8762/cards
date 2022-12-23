import { AppThunkType } from '../../../app/store'

import { recoveryApi } from './recovery-api'

const initialState: RecoveryStateType = {
  error: '',
  success: false,
}

// reducer
export const recoveryReducer = (
  state: RecoveryStateType = initialState,
  action: RecoveryActionType
): RecoveryStateType => {
  switch (action.type) {
    case 'RECOVERY/RECOVERY_PASSWORD': {
      return { ...state, error: action.error, success: action.success }
    }
    default:
      return state
  }
}

// actions
export const recoveryAC = (error: string, success: boolean) =>
  ({ type: 'RECOVERY/RECOVERY_PASSWORD', error, success } as const)

// thunks
export const recoveryTC =
  (email: string): AppThunkType =>
  dispatch => {
    recoveryApi
      .recovery(email)
      .then(res => {
        dispatch(recoveryAC('', res.data.success))
        console.log(res.data.success)
      })
      .catch(() => {
        dispatch(recoveryAC('неверный Email', false))
      })
  }

// types
export type RecoveryStateType = {
  error: string
  success: boolean
}
export type RecoveryActionType = ReturnType<typeof recoveryAC>
