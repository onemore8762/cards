import { AppThunkType } from '../../app/store'

import { packListApi, PacksType } from './packList-api'

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
    default:
      return state
  }
}

// actions
export const getPacksAC = (packs: Array<PacksType>) =>
  ({ type: 'PACKLIST/GET_PACKS', packs } as const)

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

// types
export type PackListActionType = ReturnType<typeof getPacksAC>
export type PackListInitialStateType = {
  packList: Array<PacksType>
}
