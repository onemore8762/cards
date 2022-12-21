import { AppRootStateType } from '../../../app/store'

export const selectCardsList = (state: AppRootStateType) => state.pack.cardList
export const selectCardsPackName = (state: AppRootStateType) => state.pack.packName
export const selectCardsIsLoading = (state: AppRootStateType) => state.pack.isLoading
export const selectCardPackId = (state: AppRootStateType) => state.pack.packId
export const selectPackUserId = (state: AppRootStateType) => state.pack.userId
export const selectCardQuestion = (state: AppRootStateType) => state.pack.cardQuestion
export const selectCardsPageCount = (state: AppRootStateType) => state.pack.pageCount
export const selectCardsPage = (state: AppRootStateType) => state.pack.page
export const selectCardsTotalCount = (state: AppRootStateType) => state.pack.cardsTotalCount
export const sortCard = (state: AppRootStateType) => state.pack.sortCards
