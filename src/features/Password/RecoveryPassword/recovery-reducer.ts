import { Dispatch } from 'redux'

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
    case 'RECOVERY': {
      return { ...state, error: action.error, success: action.success }
    }
    default:
      return state
  }
}

//actions
export const recoveryAC = (error: string, success: boolean) =>
  ({ type: 'RECOVERY', error, success } as const)

//thunk
export const recoveryTC = (email: string) => {
  return (dispatch: Dispatch) => {
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
}

//types
export type RecoveryStateType = {
  error: string
  success: boolean
}
export type RecoveryActionType = ReturnType<typeof recoveryAC>
