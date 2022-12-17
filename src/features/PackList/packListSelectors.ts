import { AppRootStateType } from '../../app/store'

export const selectPackList = (state: AppRootStateType) => state.packList.packList
