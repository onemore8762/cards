import { instance } from '../../../common/api/cards-api'

export const learnPackApi = {
  updateCardGrade(grade: number, card_id: string) {
    return instance.put('/cards/grade', {
      grade,
      card_id,
    })
  },
}
