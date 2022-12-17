import { AppThunkType } from '../../app/store'

import { addCardsPack, newPack, packListApi, PacksType } from './packList-api'

const initialState: PackListInitialStateType = {
  packList: [],
}

// reducer
export const packListReducer = (
  state: PackListInitialStateType = initialState,
  action: PackListActionType
): PackListInitialStateType => {
  switch (action.type) {
    case 'PACKLIST/GET_PACKS':
      return { ...state, packList: action.packs }
    // case 'PACKLIST/ADD_PACKS':
    //   return { ...state, packList: action.packs }
    default:
      return state
  }
}

// actions
export const getPacksAC = (packs: Array<PacksType>) =>
  ({ type: 'PACKLIST/GET_PACKS', packs } as const)
// export const addPacksAC = (packs: Array<PacksType>) =>
//   ({ type: 'PACKLIST/ADD_PACKS', packs } as const)
// thunk
export const getPacksTC = (): AppThunkType => {
  return dispatch => {
    packListApi.getPacks().then(res => {
      console.log(res.data.cardPacks)

      // @ts-ignore
      dispatch(getPacksAC(res.data.cardPacks))
    })
  }
}
export const addPacksTC = (cardsPack: newPack): AppThunkType => {
  return dispatch => {
    packListApi.addPacks(cardsPack).then(res => {
      console.log(res.data.cardPacks)
      // @ts-ignore
      dispatch(getPacksTC())
    })
  }
}

// types
export type PackListActionType = ReturnType<typeof getPacksAC>
// ReturnType<typeof addPacksAC>
export type PackListInitialStateType = {
  packList: Array<PacksType>
}
