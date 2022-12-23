import { instance } from '../../../common/api/cards-api'

export const packListApi = {
  getPacks(params: getPacksParamsType = {}) {
    return instance.get<GetPacksResponseType>('/cards/pack', {
      params,
    })
  },
  addPacks(cardsPack: newPack) {
    return instance.post('/cards/pack', cardsPack)
  },
  update(cardsPack: newPack) {
    return instance.put('/cards/pack', cardsPack)
  },
  delete(idPack: string) {
    return instance.delete(`/cards/pack?id=${idPack}`)
  },
}

// types
export type getPacksParamsType = {
  packName?: string
  min?: number | null
  max?: number | null
  sortPacks?: '0updated' | '1updated'
  page?: number
  pageCount?: number
  user_id?: string | null
  block?: boolean
}
export type newPack = {
  cardsPack: addCardsPack
}
export type addCardsPack = {
  name?: string // если не отправить будет 'no Name'
  deckCover?: 'url or base64' // не обязателен
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
