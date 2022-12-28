import { appSetStatusAC } from '../../../app/app-reducer'
import { AppThunkType } from '../../../app/store'
import { handleServerNetworkError } from '../../../common/utils/errorUtils'
import { cardApi, Cards } from '../Card/card-api'

import { learnPackApi } from './learn-pack-api'
import { getCard } from './randomFunction'

const initialState: LearnPackInitialStateType = {
  cardList: [],
  packName: '',
  grade: '1',
  randomCard: {
    _id: 'fake',
    cardsPack_id: '',

    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
    __v: 0,
    answerImg: '',
    answerVideo: '',
    questionImg: '',
    questionVideo: '',
    user_id: 'fake',
    comments: '',
  },
}

export const learnPackReducer = (state = initialState, action: LearnActionType) => {
  switch (action.type) {
    case 'LEARN_PACKS/SET_CARD_LIST':
      return { ...state, cardList: action.cardList, packName: action.packName }
    case 'LEARN_PACKS/SET_GRADE':
      return { ...state, grade: action.grade }
    case 'LEARN_PACKS/SET_CARD':
      return { ...state, randomCard: action.randomCard }
    default:
      return state
  }
}

//action
const setCardListAC = (cardList: Cards[], packName: string) =>
  ({ type: 'LEARN_PACKS/SET_CARD_LIST', cardList, packName } as const)

export const setGradeAC = (grade: string) => ({ type: 'LEARN_PACKS/SET_GRADE', grade } as const)

export const setCardAC = (randomCard: Cards) =>
  ({ type: 'LEARN_PACKS/SET_CARD', randomCard } as const)

//thunk
export const getRandomCardTC = (packId: string): AppThunkType => {
  return dispatch => {
    dispatch(appSetStatusAC('loading'))
    cardApi
      .getCardsList({ cardsPack_id: packId, pageCount: 120 })
      .then(res => {
        const RandomCard = getCard(res.data.cards)

        dispatch(setCardListAC(res.data.cards, res.data.packName))
        dispatch(setCardAC(RandomCard))
        dispatch(appSetStatusAC('succeeded'))
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }
}
export const updateGradeTC = (card_id: string, grade: string): AppThunkType => {
  return () => {
    learnPackApi.updateCardGrade(+grade, card_id).then(res => {
      console.log(res.data)
    })
  }
}
//type
export type LearnPackInitialStateType = {
  cardList: Array<Cards>
  packName: string
  grade: string
  randomCard: Cards
}
export type LearnActionType =
  | ReturnType<typeof setCardListAC>
  | ReturnType<typeof setGradeAC>
  | ReturnType<typeof setCardAC>
