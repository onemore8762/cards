import { AppRootStateType } from '../../../app/store'

export const selectRecoveryPassword = (state: AppRootStateType) => state.newPassword.onSuccess
export const selectRecoveryPassError = (state: AppRootStateType) => state.newPassword.error
