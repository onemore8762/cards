import { AppRootStateType } from './store'

export const selectInitializeApp = (state: AppRootStateType) => state.app.isInitialized
