import { AppThunkType } from '../../../app/store'

import { Cards, packApi } from './pack-api'
import { addCardType, Cards, packApi, updateCardType } from './pack-api'

const initialState: PackInitialStateType = {
  cardList: [],
  userId: '',
  cardQuestion: '',
  cardPackId: '',
  packId: '',
  // sortPacks: '0updated',
}

// reducer
export const packReducer = (
  state: PackInitialStateType = initialState,
  action: PackActionType
): PackInitialStateType => {
  switch (action.type) {
    case 'PACKS/GET_PACKS':
      return { ...state, cardList: action.cards, userId: action.userId, packId: action.packId }
    case 'PACKS/SET_SEARCH_QUESTION':
      return { ...state, cardQuestion: action.question }
    case 'PACKS/SET_CARD-PACK-ID':
      return { ...state, cardPackId: action.cardPackId }
    default:
      return state
  }
}

// actions
export const getCardsListAC = (cards: Array<Cards>, userId: string) =>
  ({ type: 'PACKS/GET_PACKS', cards, userId } as const)
export const setSearchQuestionAC = (question: string) =>
  ({ type: 'PACKS/SET_SEARCH_QUESTION', question } as const)
export const setCardPackIdAC = (cardPackId: string) =>
  ({ type: 'PACKS/SET_CARD-PACK-ID', cardPackId } as const)

// thunk
export const getCardsListTC = (id: string, userId: string): AppThunkType => {
  return (dispatch, getState) => {
    const { cardQuestion } = getState().pack

    packApi.getCardsList({ cardsPack_id: id, cardQuestion }).then(res => {
      console.log(res.data.cards)

      dispatch(getCardsListAC(res.data.cards, userId))
    })
  }
}
export const addCardTC = (card: AddCardType): AppThunkType => {
  return (dispatch, getState) => {
    const { packId, userId } = getState().pack

    packApi.addCard(card).then(res => {
      dispatch(getCardsListTC(packId, userId))
    })
  }
}
export const updateCardTC = (card: UpdateCardType): AppThunkType => {
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
  cardList: Array<Cards>
  userId: string
  cardQuestion: string
  cardPackId: string
  packId: string
  // sortPacks: '0updated' | '1updated'
}
export type PackActionType =
  | ReturnType<typeof getCardsListAC>
  | ReturnType<typeof setSearchQuestionAC>
  | ReturnType<typeof setCardPackIdAC>
