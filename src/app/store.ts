import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { loginReducer } from '../features/Login/login-reducer'
import { registrationReducer } from '../features/Registration/registration-reducer'

import { reducer } from './reducers'

const rootReducer = combineReducers({
  reducer: reducer,
  auth: loginReducer,
  registration: registrationReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>

// @ts-ignore
window.store = store
