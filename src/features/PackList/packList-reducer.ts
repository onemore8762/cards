import { AppThunkType } from '../../app/store'

import { newPack, packListApi, PacksType } from './packList-api'

const initialState: PackListInitialStateType = {
  packList: [],
  sortPacks: '0updated',
  isMy: false,
  min: 0,
  max: 100,
}

// reducer
export const packListReducer = (
  state: PackListInitialStateType = initialState,
  action: PackListActionType
): PackListInitialStateType => {
  switch (action.type) {
    case 'PACKLIST/SET_PACKS':
      return { ...state, packList: action.packs }
    case 'PACKLIST/SORT_PACKS':
      if (state.sortPacks === '0updated') {
        return { ...state, sortPacks: '1updated' }
      } else {
        return { ...state, sortPacks: '0updated' }
      }
    case 'PACKLIST/SET_IS_MY':
      return { ...state, isMy: action.isMy }
    case 'PACKLIST/SET_MAX_MIN':
      return { ...state, min: action.min, max: action.max }
    default:
      return state
  }
}

// actions
export const setPacksAC = (packs: Array<PacksType>) =>
  ({ type: 'PACKLIST/SET_PACKS', packs } as const)
export const sortPacksAC = () => ({ type: 'PACKLIST/SORT_PACKS' } as const)
export const setIsMy = (isMy: boolean) => ({ type: 'PACKLIST/SET_IS_MY', isMy: isMy } as const)
export const setMaxMin = (min: number, max: number) =>
  ({ type: 'PACKLIST/SET_MAX_MIN', min, max } as const)
// thunk
export const getPacksTC = (): AppThunkType => {
  return (dispatch, getState) => {
    const { sortPacks, isMy, max, min } = getState().packList
    let user_id

    if (isMy) {
      const { _id } = getState().profile

      user_id = _id
    }

    packListApi.getPacks({ sortPacks, user_id, max, min }).then(res => {
      console.log(res.data.cardPacks)
      // @ts-ignore
      dispatch(setPacksAC(res.data.cardPacks))
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
export type PackListActionType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof sortPacksAC>
  | ReturnType<typeof setIsMy>
  | ReturnType<typeof setMaxMin>
export type PackListInitialStateType = {
  packList: Array<PacksType>
  sortPacks: '0updated' | '1updated'
  isMy: boolean
  min: number
  max: number
}
