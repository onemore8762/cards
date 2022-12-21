import { PackInitialStateType, packReducer, setSearchQuestionAC } from './pack-reducer'

let startState: PackInitialStateType

beforeEach(() => {
  startState = {
    isLoading: false,
    cardList: [],
    userId: '',
    cardQuestion: '',
    packId: '',
    page: 0,
    pageCount: 0,
    packName: '',
    packUserId: '',
    cardsTotalCount: 0,
    sortCards: '0updated',
  }
})

// test('cards should be set to the state', () => {
//   const action = [
//     {
//       _id: '63a219de736147000449500c',
//       cardsPack_id: '63a181a87361470004494fd5',
//       user_id: '6399d599fc64ea0004138804',
//       answer: 'no answer',
//       question: 'new question',
//       grade: 0,
//       shots: 0,
//       comments: '',
//       type: 'card',
//       rating: 0,
//       more_id: '6399d599fc64ea0004138804',
//       created: '2022-12-20T20:23:58.176Z',
//       updated: '2022-12-21T05:20:38.205Z',
//       __v: 0,
//       answerImg: '',
//       answerVideo: '',
//       questionImg: '',
//       questionVideo: '',
//     },
//   ]
//
//   const userId = '6399d599fc64ea0004138804'
//   const cardsPack_id = '63a181a87361470004494fd5'
//
//   const endState = packReducer(startState, setCardsListAC(action, userId, cardsPack_id))
//
//   expect(endState.cardList[0].answer).toBe('no answer')
//   expect(endState.cardList[0].user_id).toBe('6399d599fc64ea0004138804')
//   expect(endState.cardList[0].cardsPack_id).toBe('63a181a87361470004494fd5')
// })

test('question should be set to the state', () => {
  const endState = packReducer(startState, setSearchQuestionAC('react'))

  expect(endState.cardQuestion).toBe('react')
})

/*test('cardId should be set to the state', () => {
  const endState = packReducer(startState, setCardPackIdAC('63a181a87361470004494fd5'))

  expect(endState.cardPackId).toBe('63a181a87361470004494fd5')
})*/
