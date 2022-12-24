import { instance } from '../../../common/api/cards-api'
import { LogoutResponseType } from '../../Login/login-api'

import { SetPasswordType } from './new-password-reducer'

export const passwordApi = {
  setNewPassword(data: SetPasswordType) {
    return instance.post<LogoutResponseType>('auth/set-new-password', data)
  },
}
