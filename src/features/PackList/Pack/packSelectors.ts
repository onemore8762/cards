import { AppRootStateType } from '../../../app/store'

export const selectCardsList = (state: AppRootStateType) => state.pack.cardList
export const selectPackUserId = (state: AppRootStateType) => state.pack.userId
