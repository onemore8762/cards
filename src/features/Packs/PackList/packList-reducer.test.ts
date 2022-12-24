import {
  PackListInitialStateType,
  packListReducer,
  setPacksAC,
  setUpdatePackAC,
} from './packList-reducer'

let startState: PackListInitialStateType

beforeEach(() => {
  startState = {
    initialize: false,
    isLoading: false,
    cardPacks: [],
    sortPacks: '0updated',
    isMy: false,
    min: 0,
    max: 100,
    page: 0,
    cardPacksTotalCount: 0,
    pageCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    packName: '',
  }
})

test('packs should be set to state (SET_PACKS)', () => {
  const actionObj = {
    cardPacks: [
      {
        _id: '333',
        user_id: '111',
        user_name: 'Dan',
        private: false,
        name: 'pack name',
        path: '/def',
        grade: 0,
        shots: 0,
        cardsCount: 4,
        type: 'pack',
        rating: 5,
        created: '2022-12-19T15:40:40.339Z',
        updated: '2022-12-20T15:40:40.339Z',
        more_id: '111',
        __v: 1,
      },
    ],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 200,
    minCardsCount: 0,
    maxCardsCount: 110,
    token: '00cc84e0-7fcd-11ed-b581-a36473125a03',
    tokenDeathTime: 1672080197678,
  }
  const endState = packListReducer(startState, setPacksAC(actionObj))

  expect(endState.cardPacks.length).toBe(1)
  expect(endState.cardPacksTotalCount).toBe(200)
})

test('pack should be updated (UPDATE_PACK)', () => {
  const actionObj = {
    isLoading: false,
    initialize: true,
    packs: {
      cardPacks: [
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
      page: 1,
      pageCount: 4,
      cardPacksTotalCount: 300,
      minCardsCount: 1,
      maxCardsCount: 100,
      token: '486dfa30-82b2-11ed-99a9-8d13eeb74714',
      tokenDeathTime: 1671804574931,
    },
    isMy: true,
    min: 1,
    max: 20,
    page: 1,
    pageCount: 4,
    packName: 'My Card',
    sortPacks: '0updated',
  }

  const endState = packListReducer(startState, setUpdatePackAC({ isMy: true }))

  expect(endState.isMy).toBeTruthy()
})

// export default ()=> {}
