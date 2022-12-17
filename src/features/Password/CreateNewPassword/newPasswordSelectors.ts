import { AppRootStateType } from '../../../app/store'

export const selectNewPassword = (state: AppRootStateType) => state.newPassword.onSuccess
export const selectPasswordError = (state: AppRootStateType) => state.newPassword.error
