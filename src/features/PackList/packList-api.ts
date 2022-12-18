import { instance } from '../../common/api/cards-api'

export const packListApi = {
  getPacks(params: getPacksParamsType = {}) {
    return instance.get<GetPacksResponseType>('/cards/pack', {
      params: params,
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
//type
export type getPacksParamsType = {
  packName?: string // не обязательно
  min?: number | null // не обязательно
  max?: number | null // не обязательно
  sortPacks?: '0updated' | '1updated' // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно
  user_id?: string | null
  // чьи колоды не обязательно, или придут все

  block?: boolean // не обязательно
  // если вас кто то забанил. То с помощью
  // данного параметра можно увидеть свои колоды
  // и поправить их или удалить или обжаловать 🙃
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
