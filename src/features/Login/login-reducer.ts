import { Dispatch } from 'redux'

import { loginApi, LoginParamsType } from './login-api'

const initialState: StateType = {
  isLoggedIn: false,
}

export const loginReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, isLoggedIn: action.values }
    }
    default:
      return state
  }
}

//action
const loginAC = (values: boolean) => ({ type: 'LOGIN', values } as const)

//thunk
export const loginTC = (values: LoginParamsType) => {
  return (dispatch: Dispatch<ActionType>) => {
    loginApi
      .login(values)
      .then(res => {
        debugger
        dispatch(loginAC(true))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
      })
  }
}
//type
type ActionType = ReturnType<typeof loginAC>

type StateType = {
  isLoggedIn: boolean
}
// {
//   _id: string
//   email: string
//   name: string
//   avatar?: string
//   publicCardPacksCount: number
//   // количество колод
//
//   created: Date
//   updated: Date
//   isAdmin: boolean
//   verified: boolean // подтвердил ли почту
//   rememberMe: boolean
//
//   error?: string
// }
