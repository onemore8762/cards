import { instance } from '../../../common/api/cards-api'

export const learnPackApi = {
  updateCardGrade(cardData: CardDataType) {
    return instance.put('/cards/grade', {
      cardData,
    })
  },
}

//type

export type CardDataType = {
  grade: number
  card_id: string
}
