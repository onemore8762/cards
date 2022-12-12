import { instance } from '../../common/api/cards-api'

import { userData } from './registration-reducer'

export const registrationApi = {
  registration(data: userData) {
    return instance.post<ResponseTypeSuccess>('auth/register', data)
  },
}

//type

export type ResponseTypeSuccess = {
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
/*type ResponseTypeError = {
  emailRegExp: {}
  error: string
  in: string
  isEmailValid: boolean
  isPassValid: boolean
  passwordRegExp: string
}*/
//data -> addedUser -> {}
/*
addedUser = {
  "created": "2022-12-12T21:07:05.681Z",
  "email": "simiserg@mail.ru",
  "isAdmin": false,
  "name": "simiserg@mail.ru",
  "publicCardPacksCount": 0,
  "rememberMe": false,
  "updated": "2022-12-12T21:07:05.681Z",
  "verified": false,
  "__v": 0,
  "_id": "639797f91546a94180ebcd2b",
}
*/
