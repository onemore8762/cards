import { AppThunkType } from '../../../app/store'

import { AddCardType, Cards, packApi, ResponseGetCardsType, UpdateCardType } from './pack-api'

const initialState: PackInitialStateType = {
  isLoading: false,
  cardList: [],
  userId: '',
  cardQuestion: '',
  cardPackId: '',
  packId: '',
  page: 0,
  pageCount: 0,
  packName: '',
  packUserId: '',
  cardsTotalCount: 0,
  // sortPacks: '0updated',
}

// reducer
export const packReducer = (
  state: PackInitialStateType = initialState,
  action: PackActionType
): PackInitialStateType => {
  switch (action.type) {
    case 'PACKS/GET_PACKS':
      return {
        ...state,
        cardList: action.data.cards,
        userId: action.data.packUserId,
        packId: action.packId,
        page: action.data.page,
        pageCount: action.data.pageCount,
        cardsTotalCount: action.data.cardsTotalCount,
      }
    case 'PACKS/SET_SEARCH_QUESTION':
      return { ...state, cardQuestion: action.question }
    case 'PACKS/SET_CARD-PACK-ID':
      return { ...state, cardPackId: action.cardPackId }
    case 'PACKS/SET_PAGE':
      return { ...state, page: action.page }
    case 'PACKS/SET_PAGE_COUNT':
      return { ...state, pageCount: action.pageCount }
    default:
      return state
  }
}

// actions
export const setCardsListAC = (packId: string, data: ResponseGetCardsType) =>
  ({ type: 'PACKS/GET_PACKS', data, packId } as const)
export const setSearchQuestionAC = (question: string) =>
  ({ type: 'PACKS/SET_SEARCH_QUESTION', question } as const)
export const setCardPackIdAC = (cardPackId: string) =>
  ({ type: 'PACKS/SET_CARD-PACK-ID', cardPackId } as const)
export const setPageCardsAC = (page: number) => ({ type: 'PACKS/SET_PAGE', page } as const)
export const setPageCountCardsAC = (pageCount: number) =>
  ({ type: 'PACKS/SET_PAGE_COUNT', pageCount } as const)
// thunk
export const getCardsListTC = (packId: string): AppThunkType => {
  return (dispatch, getState) => {
    const { cardQuestion, page, pageCount } = getState().pack

    packApi.getCardsList({ cardsPack_id: packId, cardQuestion, page, pageCount }).then(res => {
      dispatch(setCardsListAC(packId, res.data))
    })
  }
}
export const addCardTC = (card: AddCardType): AppThunkType => {
  return (dispatch, getState) => {
    const { packId } = getState().pack

    packApi.addCard(card).then(() => {
      dispatch(getCardsListTC(packId))
    })
  }
}
export const updateCardTC = (card: UpdateCardType): AppThunkType => {
  return (dispatch, getState) => {
    const { packId } = getState().pack

    packApi.updateCard(card).then(() => {
      dispatch(getCardsListTC(packId))
    })
  }
}
export const deleteCardTC = (idCard: string): AppThunkType => {
  return (dispatch, getState) => {
    const { packId } = getState().pack

    packApi.deleteCard(idCard).then(() => {
      dispatch(getCardsListTC(packId))
    })
  }
}

// types
export type PackInitialStateType = {
  isLoading: boolean
  cardList: Array<Cards>
  userId: string
  cardQuestion: string
  cardPackId: string
  packId: string
  page: number
  pageCount: number
  packName: string
  packUserId: string
  cardsTotalCount: number
  // sortPacks: '0updated' | '1updated'
}
export type PackActionType =
  | ReturnType<typeof setCardsListAC>
  | ReturnType<typeof setSearchQuestionAC>
  | ReturnType<typeof setCardPackIdAC>
  | ReturnType<typeof setPageCardsAC>
  | ReturnType<typeof setPageCountCardsAC>
