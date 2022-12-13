import { Dispatch } from 'redux'

import { recoveryApi } from './recovery-api'

const initialState: StateType = {
  error: '',
  success: false,
}

export const recoveryReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'RECOVERY': {
      return { ...state, error: action.error, success: action.success }
    }
    default:
      return state
  }
}

//action
const recoveryAC = (error: string, success: boolean) =>
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
//type
type StateType = {
  error: string
  success: boolean
}
type ActionType = ReturnType<typeof recoveryAC>
