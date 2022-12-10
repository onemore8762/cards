import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { reducer } from './reducers'

const rootReducer = combineReducers({
  reducer: reducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,AppRootStateType,unknown,AppActionType>

// @ts-ignore
window.store = store
