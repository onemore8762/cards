import { AppRootStateType } from '../../app/store'

export const selectUserName = (state: AppRootStateType) => state.profile.name
export const selectUserEmail = (state: AppRootStateType) => state.profile.email
