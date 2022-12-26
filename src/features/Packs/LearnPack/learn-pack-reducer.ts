import { AppThunkType } from '../../../app/store'
import { cardApi, Cards } from '../Card/card-api'

const initialState: LearnPackInitialStateType = {
  cardList: [],
  packName: '',
}

export const learnPackReducer = (state = initialState, action: PackActionType) => {
  switch (action.type) {
    case 'LEARN_PACKS/SET_CARD_LIST':
      return { ...state, cardList: action.cardList, packName: action.packName }
    default:
      return state
  }
}

//action
const setCardListAC = (cardList: Cards[], packName: string) =>
  ({ type: 'LEARN_PACKS/SET_CARD_LIST', cardList, packName } as const)

//thunk
export const getCardListTC = (packId: string): AppThunkType => {
  return dispatch => {
    cardApi.getCardsList({ cardsPack_id: packId }).then(res => {
      //console.log(res.data.cards)
      // @ts-ignore
      dispatch(setCardListAC(res.data.cards, res.data.packName))
    })
  }
}
//type
export type LearnPackInitialStateType = {
  cardList: Array<Cards>
  packName: string
}
export type PackActionType = ReturnType<typeof setCardListAC>
