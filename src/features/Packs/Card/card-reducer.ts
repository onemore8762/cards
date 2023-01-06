import { AppThunkType } from '../../../app/store'
import { handleServerNetworkError } from '../../../common/utils/errorUtils'

import { AddCardType, Cards, cardApi, ResponseGetCardsType, UpdateCardType } from './card-api'

const initialState: CardInitialStateType = {
  initialize: false,
  isLoading: false,
  cardList: [],
  userId: '',
  cardQuestion: null,
  packId: '',
  page: 0,
  pageCount: 0,
  packName: '',
  packUserId: '',
  cardsTotalCount: 0,
  sortCards: '0updated',
  packDeckCover: '',
}

// reducer
export const cardReducer = (
  state: CardInitialStateType = initialState,
  action: PackActionType
): CardInitialStateType => {
  switch (action.type) {
    case 'PACKS/SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case 'PACKS/GET_PACKS':
      return {
        ...state,
        cardList: action.data.cards,
        userId: action.data.packUserId,
        packId: action.packId,
        page: action.data.page,
        pageCount: action.data.pageCount,
        cardsTotalCount: action.data.cardsTotalCount,
        packName: action.data.packName,
        packDeckCover: action.data.packDeckCover,
      }
    case 'PACKS/SET_CARD-PACK-ID':
      return { ...state, packId: action.packId }
    case 'PACKS/SORT_CARDS':
      if (state.sortCards === '0updated') {
        return { ...state, sortCards: '1updated' }
      } else {
        return { ...state, sortCards: '0updated' }
      }
    case 'PACKS/UPDATE_CARDS':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// actions
export const setCardsListAC = (packId: string, data: ResponseGetCardsType) =>
  ({ type: 'PACKS/GET_PACKS', data, packId } as const)
export const setCardPackIdAC = (packId: string) =>
  ({ type: 'PACKS/SET_CARD-PACK-ID', packId } as const)
export const setLoadingCardsAC = (isLoading: boolean) =>
  ({ type: 'PACKS/SET_LOADING', isLoading } as const)
export const sortCardsAC = () => ({ type: 'PACKS/SORT_CARDS' } as const)
export const setUpdateCardsAC = (payload: UpdateCardsType) =>
  ({ type: 'PACKS/UPDATE_CARDS', payload } as const)

// thunks
export const getCardsListTC = (): AppThunkType => {
  return (dispatch, getState) => {
    const { cardQuestion, page, pageCount, sortCards, packId } = getState().pack

    dispatch(setLoadingCardsAC(true))
    cardApi
      .getCardsList({ cardsPack_id: packId, cardQuestion, page, pageCount, sortCards })
      .then(res => {
        dispatch(setCardsListAC(packId, res.data))
      })
      .finally(() => {
        dispatch(setUpdateCardsAC({ initialize: true }))
        dispatch(setLoadingCardsAC(false))
      })
  }
}

export const addCardTC =
  (card: AddCardType): AppThunkType =>
  dispatch => {
    cardApi
      .addCard(card)
      .then(() => {
        dispatch(getCardsListTC())
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const updateCardTC =
  (card: UpdateCardType): AppThunkType =>
  dispatch => {
    cardApi
      .updateCard(card)
      .then(() => {
        dispatch(getCardsListTC())
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const deleteCardTC =
  (idCard: string): AppThunkType =>
  dispatch => {
    cardApi
      .deleteCard(idCard)
      .then(() => {
        dispatch(getCardsListTC())
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

// types
export type CardInitialStateType = {
  initialize: boolean
  isLoading: boolean
  cardList: Array<Cards>
  userId: string
  cardQuestion: string | null
  packId: string
  page: number
  pageCount: number
  packName: string
  packUserId: string
  cardsTotalCount: number
  sortCards: '0updated' | '1updated'
  packDeckCover: any // надо исправить!
}
export type UpdateCardsType = Partial<CardInitialStateType>

export type PackActionType =
  | ReturnType<typeof setCardsListAC>
  | ReturnType<typeof setCardPackIdAC>
  | ReturnType<typeof setLoadingCardsAC>
  | ReturnType<typeof sortCardsAC>
  | ReturnType<typeof setUpdateCardsAC>
