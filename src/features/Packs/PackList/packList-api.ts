import { instance } from '../../../common/api/cards-api'

export const packListApi = {
  getPacks(params: GetPacksParamsType = {}) {
    return instance.get<GetPacksResponseType>('/cards/pack', {
      params,
    })
  },
  addPacks(cardsPack: NewPackType) {
    return instance.post('/cards/pack', cardsPack)
  },
  update(cardsPack: NewPackType) {
    return instance.put('/cards/pack', cardsPack)
  },
  delete(pack_id: string) {
    return instance.delete(`/cards/pack?id=${pack_id}`)
  },
}

// types
export type GetPacksParamsType = {
  packName?: string
  min?: number | null
  max?: number | null
  sortPacks?: '0updated' | '1updated'
  page?: number
  pageCount?: number
  user_id?: string | null
  block?: boolean
}
export type NewPackType = {
  cardsPack: AddCardsType
}
export type AddCardsType = {
  name?: string // если не отправить будет 'no Name'
  deckCover?: string // не обязателен
  private?: boolean // если не отправить будет false
  _id?: string // для обновления
}

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
  deckCover?: string // добавил
}

export type GetPacksResponseType = {
  cardPacks: Array<PacksType>
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
