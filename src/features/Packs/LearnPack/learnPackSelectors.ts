import { AppRootStateType } from '../../../app/store'

export const selectLearnPackName = (state: AppRootStateType) => state.learnPack.packName
export const selectLearnGrade = (state: AppRootStateType) => state.learnPack.grade
export const selectLearnRandomCard = (state: AppRootStateType) => state.learnPack.randomCard
