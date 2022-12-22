import { AppRootStateType } from '../../app/store'

export const selectPackListInitialize = (state: AppRootStateType) => state.packList.initialize
export const selectPackListIsLoading = (state: AppRootStateType) => state.packList.isLoading
export const selectPackList = (state: AppRootStateType) => state.packList.cardPacks
export const selectPackListIsMy = (state: AppRootStateType) => state.packList.isMy
export const selectPackListPageCount = (state: AppRootStateType) => state.packList.pageCount
export const selectPackListPage = (state: AppRootStateType) => state.packList.page
export const selectPackListSortPacks = (state: AppRootStateType) => state.packList.sortPacks
export const selectPackListSearchPack = (state: AppRootStateType) => state.packList.packName
export const selectPackListMax = (state: AppRootStateType) => state.packList.max
export const selectPackListMin = (state: AppRootStateType) => state.packList.min
export const selectPackListCardPacksTotalCount = (state: AppRootStateType) =>
  state.packList.cardPacksTotalCount
