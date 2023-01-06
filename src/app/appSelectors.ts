import { AppRootStateType } from './store'

export const selectAppInitialize = (state: AppRootStateType) => state.app.isInitialized
export const selectAppStatus = (state: AppRootStateType) => state.app.status
