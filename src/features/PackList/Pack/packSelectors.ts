import { AppRootStateType } from '../../../app/store'

export const selectCardsList = (state: AppRootStateType) => state.pack.cardList
export const selectCardsIsLoading = (state: AppRootStateType) => state.pack.isLoading
export const selectCardPackId = (state: AppRootStateType) => state.pack.packId
export const selectPackUserId = (state: AppRootStateType) => state.pack.userId
export const selectCardQuestion = (state: AppRootStateType) => state.pack.cardQuestion
