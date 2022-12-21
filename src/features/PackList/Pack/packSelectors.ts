import { AppRootStateType } from '../../../app/store'

export const selectCardsList = (state: AppRootStateType) => state.pack.cardList
export const selectCardsPackName = (state: AppRootStateType) => state.pack.packName
export const selectCardsIsLoading = (state: AppRootStateType) => state.pack.isLoading
export const selectCardPackId = (state: AppRootStateType) => state.pack.packId
export const selectPackUserId = (state: AppRootStateType) => state.pack.userId
export const selectCardQuestion = (state: AppRootStateType) => state.pack.cardQuestion
export const sortCard = (state: AppRootStateType) => state.pack.sortCards
