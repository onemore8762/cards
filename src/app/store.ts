import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { loginReducer } from '../features/Login/login-reducer'

import { reducer } from './reducers'

const rootReducer = combineReducers({
  reducer: reducer,
  auth: loginReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,AppRootStateType,unknown,AppActionType>

// @ts-ignore
window.store = store
