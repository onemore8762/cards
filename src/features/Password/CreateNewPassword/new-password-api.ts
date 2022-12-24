import { instance } from '../../../common/api/cards-api'

import { SetPasswordType } from './new-password-reducer'

export const passwordApi = {
  setNewPassword(data: SetPasswordType) {
    return instance.post<ResponseType>('auth/set-new-password', data)
  },
}

// types
export type ResponseType = {
  info: string
  error: string
}
