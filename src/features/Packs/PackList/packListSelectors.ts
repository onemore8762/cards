import { AppRootStateType } from '../../../app/store'

type T = AppRootStateType
export const selectPackListInitialize = (state: T) => state.packList.initialize
export const selectPackListIsLoading = (state: T) => state.packList.isLoading
export const selectPackList = (state: T) => state.packList.cardPacks
export const selectPackListIsMy = (state: T) => state.packList.isMy
export const selectPackListPageCount = (state: T) => state.packList.pageCount
export const selectPackListPage = (state: T) => state.packList.page
export const selectPackListSortPacks = (state: T) => state.packList.sortPacks
export const selectPackListSearchPack = (state: T) => state.packList.packName
export const selectPackListMax = (state: T) => state.packList.max
export const selectPackListMin = (state: T) => state.packList.min
export const selectPackListCardPacksTotalCount = (state: T) => state.packList.cardPacksTotalCount
