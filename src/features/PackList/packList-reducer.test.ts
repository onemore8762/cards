import {
  PackListInitialStateType,
  packListReducer,
  setInitializeAC,
  setInitializePacksAC,
  setIsMyAC,
  setLoadingAC,
  setMaxMinAC,
  setPageAC,
  setPageCountAC,
  setSearchTitleAC,
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
  // const endState = packListReducer(startState, setInitializePacksAC())
  //
  // expect(endState.packs).toBe()
})

test('packs should be initialized (SET_PACKS)', () => {
  // const endState = packListReducer(startState, setPacksAC())
  //
  // expect(endState.packs).toBe()
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
