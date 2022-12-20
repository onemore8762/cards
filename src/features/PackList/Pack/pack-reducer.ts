import { AppThunkType } from '../../../app/store'

import { addCardType, Cards, packApi, updateCardType } from './pack-api'

const initialState: PackInitialStateType = {
  cardList: [],
  userId: '',
  packId: '',
  // sortPacks: '0updated',
}

// reducer
export const packReducer = (state = initialState, action: PackActionType): PackInitialStateType => {
  switch (action.type) {
    case 'PACKS/GET_PACKS':
      return { ...state, cardList: action.cards, userId: action.userId, packId: action.packId }
    default:
      return state
  }
}

// actions
export const getCardsListAC = (cards: Cards[], userId: string, packId: string) =>
  ({ type: 'PACKS/GET_PACKS', cards, userId, packId } as const)

// thunk
export const getCardsListTC = (id: string, userId: string): AppThunkType => {
  return (dispatch, getState) => {
    packApi.getCardsList({ cardsPack_id: id }).then(res => {
      console.log(res.data.cards)

      dispatch(getCardsListAC(res.data.cards, userId, id))
    })
  }
}
export const addCardTC = (card: addCardType): AppThunkType => {
  return (dispatch, getState) => {
    const { packId, userId } = getState().pack

    packApi.addCard(card).then(res => {
      dispatch(getCardsListTC(packId, userId))
    })
  }
}
export const updateCardTC = (card: updateCardType): AppThunkType => {
  return (dispatch, getState) => {
    const { packId, userId } = getState().pack

    packApi.updateCard(card).then(res => {
      dispatch(getCardsListTC(packId, userId))
    })
  }
}
export const deleteCardTC = (idCard: string): AppThunkType => {
  return (dispatch, getState) => {
    const { packId, userId } = getState().pack

    packApi.deleteCard(idCard).then(res => {
      dispatch(getCardsListTC(packId, userId))
    })
  }
}
// types
export type PackInitialStateType = {
  cardList: Cards[]
  userId: string
  packId: string
  // sortPacks: '0updated' | '1updated'
}
export type PackActionType = ReturnType<typeof getCardsListAC>
