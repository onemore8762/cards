import { AppRootStateType } from '../../../app/store'

export const selectMaxCardsCount = (state: AppRootStateType) => state.packList.maxCardsCount
export const selectMinCardsCount = (state: AppRootStateType) => state.packList.minCardsCount
