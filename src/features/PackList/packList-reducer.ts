import { AppThunkType } from '../../app/store'

import { addCardsPack, newPack, packListApi, PacksType } from './packList-api'

const initialState: PackListInitialStateType = {
  packList: [],
  sortPacks: '0updated',
}

// reducer
export const packListReducer = (
  state: PackListInitialStateType = initialState,
  action: PackListActionType
): PackListInitialStateType => {
  switch (action.type) {
    case 'PACKLIST/GET_PACKS':
      return { ...state, packList: action.packs }
    case 'PACKLIST/SORT_PACKS':
      if (state.sortPacks === '0updated') {
        return { ...state, sortPacks: '1updated' }
      } else {
        return { ...state, sortPacks: '0updated' }
      }

    default:
      return state
  }
}

// actions
export const getPacksAC = (packs: Array<PacksType>) =>
  ({ type: 'PACKLIST/GET_PACKS', packs } as const)
export const sortPacksAC = () => ({ type: 'PACKLIST/SORT_PACKS' } as const)
// thunk
export const getPacksTC = (): AppThunkType => {
  return (dispatch, getState) => {
    const { sortPacks } = getState().packList

    packListApi.getPacks({ sortPacks }).then(res => {
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
export type PackListActionType = ReturnType<typeof getPacksAC> | ReturnType<typeof sortPacksAC>
export type PackListInitialStateType = {
  packList: Array<PacksType>
  sortPacks: '0updated' | '1updated'
}
