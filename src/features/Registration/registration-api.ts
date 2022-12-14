import { instance } from '../../common/api/cards-api'

import { UserData } from './registration-reducer'

export const registrationApi = {
  registration(data: UserData) {
    return instance.post<ResponseTypeSuccess>('auth/register', data)
  },
}

//type

export type ResponseTypeSuccess = {
  addedUser: {
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: Date
    verified: boolean
    __v: number
    _id: string
  }
}
