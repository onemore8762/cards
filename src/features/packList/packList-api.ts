import { instance } from '../../common/api/cards-api'

export const packListApi = {
  getPacks() {
    return instance.get<GetPacksResponseType>('/cards/pack')
  },
}
//types
// export type GetPacksResponseType = {
//   cardPacks: PacksType[]
//   cardPacksTotalCount: number
//   // количество колод
//   maxCardsCount: number
//   minCardsCount: number
//   page: number // выбранная страница
//   pageCount: number
//   // количество элементов на странице
// }

// export type PacksType = {
//   _id: string
//   user_id: string
//   name: string
//   cardsCount: number
//   created: string
//   updated: string
// }
export type PacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type GetPacksResponseType = {
  cardPacks: PacksType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
