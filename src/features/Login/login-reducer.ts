import { Dispatch } from 'redux'

import { appSetErrorAC, appSetStatusAC } from '../../app/app-reducer'

import { loginApi, LoginParamsType } from './login-api'

const initialState: LoginInitialStateType = {
  isLoggedIn: false,
}

// reducer
export const loginReducer = (
  state: LoginInitialStateType = initialState,
  action: LoginActionType
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
export const loginAC = (isLoggedIn: boolean) => ({ type: 'LOGIN', isLoggedIn } as const)

//thunk
export const loginTC = (data: LoginParamsType) => {
  return (dispatch: Dispatch /*<LoginActionTypes>*/) => {
    dispatch(appSetStatusAC('loading'))
    loginApi
      .login(data)
      .then(res => {
        dispatch(loginAC(true))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'

        console.log(error)
        // console.log(e)
        // dispatch(appSetErrorAC(e.response.data.error))
        // dispatch(appSetStatusAC('failed'))
      })
  }
}

export const logoutTC = () => {
  return (dispatch: Dispatch /*<LoginActionTypes>*/) => {
    dispatch(appSetStatusAC('loading'))
    loginApi
      .logout()
      .then(res => {
        dispatch(loginAC(false))
        dispatch(appSetStatusAC('succeeded'))
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
export type LoginInitialStateType = {
  isLoggedIn: boolean
}

export type LoginActionType = ReturnType<typeof loginAC>
