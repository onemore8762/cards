import { Dispatch } from 'redux'

import { loginApi, LoginParamsType } from './login-api'

const initialState: LoginInitialStateType = {
  _id: null,
  email: null,
  name: null,
  nickName: 'User',
  avatar: null,
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
    case 'SET_AUTH_USER_DATA': {
      return { ...state, _id: action._id, email: action.email, name: action.name }
    }
    default:
      return state
  }
}

//action
const loginAC = (isLoggedIn: boolean) => ({ type: 'LOGIN', isLoggedIn } as const)
const setAuthUserDataAC = (_id: string, email: string, name: string, avatar?: string) =>
  ({
    type: 'SET_AUTH_USER_DATA',
    _id,
    email,
    name,
    avatar,
  } as const)

//thunk
export const loginTC = (values: LoginParamsType) => {
  return (dispatch: Dispatch<LoginActionTypes>) => {
    loginApi
      .login(values)
      .then(res => {
        dispatch(loginAC(true))
        let { _id, email, name, avatar } = res.data

        dispatch(setAuthUserDataAC(_id, email, name, avatar))
        console.log(res.data)
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
        // console.log(res, 'logout')
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
type LoginActionTypes = ReturnType<typeof loginAC> | ReturnType<typeof setAuthUserDataAC>

type LoginInitialStateType = {
  _id: null | string
  email: null | string
  name: null | string
  nickName: string
  avatar?: null | string
  isLoggedIn: boolean
}
