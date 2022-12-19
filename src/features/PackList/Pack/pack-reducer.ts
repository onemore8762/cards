import { AppThunkType } from '../../../app/store'
import { packListApi, PacksType } from '../packList-api'

import { Cards, getCardsParamsType, packApi } from './pack-api'

const initialState: PackInitialStateType = {
  cardList: [],
  userId: '',
  // sortPacks: '0updated',
}

// reducer
export const packReducer = (state = initialState, action: PackActionType): PackInitialStateType => {
  switch (action.type) {
    case 'PACKS/GET_PACKS':
      return { ...state, cardList: action.cards, userId: action.userId }
    default:
      return state
  }
}

// actions
export const getCardsListAC = (cards: Cards[], userId: string) =>
  ({ type: 'PACKS/GET_PACKS', cards, userId } as const)

// thunk
export const getCardsListTC = (id: string, userId: string): AppThunkType => {
  return (dispatch, getState) => {
    packApi.getCardsList({ cardsPack_id: id }).then(res => {
      console.log(res.data.cards)

      dispatch(getCardsListAC(res.data.cards, userId))
    })
  }
}
// types
export type PackInitialStateType = {
  cardList: Cards[]
  userId: string
  // sortPacks: '0updated' | '1updated'
}
export type PackActionType = ReturnType<typeof getCardsListAC>
