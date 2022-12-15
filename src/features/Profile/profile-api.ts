import { instance } from '../../common/api/cards-api'

export const profileApi = {
  updateUserData(name: string /*, avatar: string*/) {
    return instance.put<UpdateDataResponseType>('auth/me', { name })
  },
}

// types
export type UpdateDataResponseType = {
  updatedUser: {
    name: string
    avatar?: string
  }
  error?: string
}
