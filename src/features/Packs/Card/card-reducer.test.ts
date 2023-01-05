import {
  CardInitialStateType,
  cardReducer,
  setCardPackIdAC,
  setCardsListAC,
  setLoadingCardsAC,
  setUpdateCardsAC,
} from './card-reducer'

let startState: CardInitialStateType

beforeEach(() => {
  startState = {
    initialize: false,
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
    packDeckCover: '',
  }
})

test('cards should be set to the state', () => {
  const actionObj = {
    cards: [
      {
        _id: '63a219de736147000449500c',
        cardsPack_id: '63a181a87361470004494fd5',
        user_id: '6399d599fc64ea0004138804',
        answer: 'no answer',
        question: 'new question',
        grade: 0,
        shots: 0,
        comments: '',
        type: 'card',
        rating: 0,
        more_id: '6399d599fc64ea0004138804',
        created: '2022-12-20T20:23:58.176Z',
        updated: '2022-12-21T05:20:38.205Z',
        __v: 0,
        answerImg: '',
        answerVideo: '',
        questionImg: '',
        questionVideo: '',
      },
    ],
    packUserId: '6399d599fc64ea0004138804',
    packName: 'Update Packs',
    packPrivate: false,
    packDeckCover: 'url or base64',
    packCreated: '2022-12-22T19:37:53.086Z',
    packUpdated: '2022-12-23T11:08:02.597Z',
    page: 1,
    pageCount: 4,
    cardsTotalCount: 20,
    minGrade: 0,
    maxGrade: 6,
    token: '486dfa30-82b2-11ed-99a9-8d13eeb74714',
    tokenDeathTime: 1671804574931,
  }

  const userId = '6399d599fc64ea0004138804'

  const endState = cardReducer(startState, setCardsListAC(userId, actionObj))

  expect(endState.cardList[0].answer).toBe('no answer')
  expect(endState.cardList[0].user_id).toBe('6399d599fc64ea0004138804')
  expect(endState.packName).toBe('Update Packs')
})

test('cardId should be set to the state', () => {
  const endState = cardReducer(startState, setCardPackIdAC('63a181a87361470004494fd5'))

  expect(endState.packId).toBe('63a181a87361470004494fd5')
})

test('cards should be loaded', () => {
  const endState = cardReducer(startState, setLoadingCardsAC(true))

  expect(endState.isLoading).toBeTruthy()
})

test('search input value (question) should be set to the state', () => {
  const endState = cardReducer(startState, setUpdateCardsAC({ cardQuestion: 'react' }))

  expect(endState.cardQuestion).toBe('react')
})

// export default ()=> {}
