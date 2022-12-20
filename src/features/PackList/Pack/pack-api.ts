import { instance } from '../../../common/api/cards-api'

export const packApi = {
  getCardsList<responseGetCardsType>(params: getCardsParamsType) {
    return instance.get('/cards/card', {
      params,
    })
  },
  addCard(card: addCardType) {
    return instance.post('/cards/card', {
      card,
    })
  },
  updateCard(card: updateCardType) {
    return instance.put('/cards/card', {
      card,
    })
  },
  deleteCard(idCard: string) {
    return instance.delete(`/cards/card?id=${idCard}`)
  },
}

//types
export type updateCardType = {
  _id: string // id карточки
  question?: string // если не отправить будет дефолтное
  answer?: string // если не отправить будет таким
  grade?: number // 0..5, не обязателен
  shots?: number // не обязателен
  answerImg?: string // не обязателен
  questionImg?: string // не обязателен
  questionVideo?: string // не обязателен
  answerVideo?: string
}
export type addCardType = {
  cardsPack_id: string
  question?: string // если не отправить будет таким
  answer?: string // если не отправить будет таким
  grade?: number // 0..5, не обязателен
  shots?: number // не обязателен
  answerImg?: string // не обязателен
  questionImg?: string // не обязателен
  questionVideo?: string // не обязателен
  answerVideo?: string // не обязателен
}
export type getCardsParamsType = {
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

export type responseGetCardsType = {
  cards: Cards[]
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
