import { instance } from '../../../common/api/cards-api'

export const packApi = {
  getCardsList<ResponseGetCardsType>(params: GetCardsParamsType) {
    return instance.get('/cards/card', {
      params,
    })
  },
}

// types
export type GetCardsParamsType = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: string
}

export type Cards = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}

export type ResponseGetCardsType = {
  cards: Array<Cards>
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover?: any
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}
