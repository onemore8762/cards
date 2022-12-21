import { AppRootStateType } from '../../app/store'

export const selectInitialize = (state: AppRootStateType) => state.packList.initialize
export const selectIsLoading = (state: AppRootStateType) => state.packList.isLoading
export const selectPackList = (state: AppRootStateType) => state.packList.cardPacks
export const selectIsMy = (state: AppRootStateType) => state.packList.isMy
export const selectPageCount = (state: AppRootStateType) => state.packList.pageCount
export const selectPage = (state: AppRootStateType) => state.packList.page
export const selectSortPacks = (state: AppRootStateType) => state.packList.sortPacks
export const selectSearchPack = (state: AppRootStateType) => state.packList.packName
export const selectCardPacksTotalCount = (state: AppRootStateType) =>
  state.packList.cardPacksTotalCount
