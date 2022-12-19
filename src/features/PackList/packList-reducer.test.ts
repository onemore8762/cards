import {
  PackListInitialStateType,
  packListReducer,
  setInitializeAC,
  setInitializePacksAC,
  setIsMyAC,
  setLoadingAC,
  setMaxMinAC,
  setPacksAC,
  setPageAC,
  setPageCountAC,
  setSearchTitleAC,
  sortPacksAC,
} from './packList-reducer'

let startState: PackListInitialStateType

beforeEach(() => {
  startState = {
    initialize: false,
    isLoading: false,
    packList: [],
    sortPacks: '0updated',
    isMy: false,
    min: 0,
    max: 100,
    page: 0,
    cardPacksTotalCount: 0,
    pageCount: 0,
    packName: '',
  }
})

test('packlist should be loaded', () => {
  const endState = packListReducer(startState, setLoadingAC(true))

  expect(endState.isLoading).toBeTruthy()
})

test('something should be initialized', () => {
  const endState = packListReducer(startState, setInitializeAC(true))

  expect(endState.initialize).toBeTruthy()
})

test('packs should be initialized (SET_INITIALIZE_PACKS)', () => {
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
    cardPacksTotalCount: 500,
    minCardsCount: 10,
    maxCardsCount: 20,
    token: '00cc84e0-7fcd-11ed-b581-a36473125a03',
    tokenDeathTime: 1672080197678,
  }

  const endState = packListReducer(startState, setInitializePacksAC(actionObj))

  expect(endState.packList.length).toBe(1)
  expect(endState.max).toBe(20)
  expect(endState.min).toBe(10)
  expect(endState.page).toBe(1)
  expect(endState.pageCount).toBe(4)
  expect(endState.cardPacksTotalCount).toBe(500)
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

  expect(endState.packList.length).toBe(1)
  expect(endState.cardPacksTotalCount).toBe(200)
})

test('packs should be sorted to another', () => {
  const endState = packListReducer(startState, sortPacksAC())

  expect(endState.sortPacks).toBe('1updated')
})

test('my packs should be loaded', () => {
  const endState = packListReducer(startState, setIsMyAC(true))

  expect(endState.isMy).toBeTruthy()
})

test('number of cards should be set', () => {
  const endState = packListReducer(startState, setMaxMinAC(10, 20))

  expect(endState.min).toBe(10)
  expect(endState.max).toBe(20)
})

test('number of page should be set', () => {
  const endState = packListReducer(startState, setPageAC(1))

  expect(endState.page).toBe(1)
})

test('number of page count should be set', () => {
  const endState = packListReducer(startState, setPageCountAC(5))

  expect(endState.pageCount).toBe(5)
})

test('search title should be set to state', () => {
  const endState = packListReducer(startState, setSearchTitleAC('find something'))

  expect(endState.packName).toBe('find something')
})
