import {
  AppInitialStateType,
  appReducer,
  appSetErrorAC,
  appSetInitializedAC,
  appSetStatusAC,
} from './app-reducer'

let startState: AppInitialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('app status should be changed', () => {
  const endTasksState = appReducer(startState, appSetStatusAC('loading'))

  expect(endTasksState.status).toBe('loading')
})

test('app error message should be set to the state', () => {
  const endTasksState = appReducer(startState, appSetErrorAC('Some Error'))

  expect(endTasksState.error).toBe('Some Error')
})

test('app should initialize', () => {
  const endTasksState = appReducer(startState, appSetInitializedAC(true))

  expect(endTasksState.isInitialized).toBeTruthy()
})
