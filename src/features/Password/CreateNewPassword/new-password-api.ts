import { instance } from '../../../common/api/cards-api'

import { setPasswordType } from './new-password-reducer'

export const passwordApi = {
  setNewPassword(data: setPasswordType) {
    return instance.post<ResponseType>('auth/set-new-password', data)
  },
}

//type

export type ResponseType = {
  info: string
  error: string
}
