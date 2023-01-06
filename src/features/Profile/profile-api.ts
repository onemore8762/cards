import { instance } from '../../common/api/cards-api'

export const profileApi = {
  updateUserData(name: string) {
    return instance.put<UpdateDataResponseType>('auth/me', { name })
  },
  updateUserPhoto(avatar: string) {
    return instance.put<UpdateDataResponseType>('auth/me', { avatar })
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
