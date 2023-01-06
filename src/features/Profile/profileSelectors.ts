import { AppRootStateType } from '../../app/store'

export const selectProfileUserId = (state: AppRootStateType) => state.profile._id
export const selectUserName = (state: AppRootStateType) => state.profile.name
export const selectUserEmail = (state: AppRootStateType) => state.profile.email
export const selectUserAvatar = (state: AppRootStateType) => state.profile.avatar
