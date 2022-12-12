import { instance } from '../../common/api/cards-api'

export const loginApi = {
  login(values: LoginParamsType) {
    return instance.post('auth/login', values)
  },
}

//type
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}
