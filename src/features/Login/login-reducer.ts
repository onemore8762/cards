import { Dispatch } from 'redux'

import { loginApi, LoginParamsType } from './login-api'

const initialState: LoginInitialStateType = {
  isLoggedIn: false,
}

export const loginReducer = (
  state: LoginInitialStateType = initialState,
  action: LoginActionTypes
): LoginInitialStateType => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, isLoggedIn: action.isLoggedIn }
    }
    default:
      return state
  }
}

//action
const loginAC = (isLoggedIn: boolean) => ({ type: 'LOGIN', isLoggedIn } as const)

//thunk
export const loginTC = (data: LoginParamsType) => {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    loginApi
      .login(data)
      .then(res => {
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

export const logoutTC = () => {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    loginApi
      .logout()
      .then(res => {
        dispatch(loginAC(false))
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
type LoginActionTypes = ReturnType<typeof loginAC>

type LoginInitialStateType = {
  isLoggedIn: boolean
}
