import { instance } from '../../common/api/cards-api'

export const loginApi = {
  login(values: LoginParamsType) {
    return instance.post<LoginResponseType>('auth/login', values)
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/me')
  },
  authMe() {
    return instance.post<LoginResponseType>('auth/me')
  },
}

// types
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponseType = {
  _id: string
  email: string
  name: string
  avatar: string
  publicCardPacksCount: number // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

export type LogoutResponseType = {
  info: string
  error: string
}
