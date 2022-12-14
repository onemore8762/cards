import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/Auth/auth-reducer'
import { loginReducer } from '../features/Login/login-reducer'
import { profileReducer } from '../features/Profile/profile-reducer'
import { registrationReducer } from '../features/Registration/registration-reducer'

import { appReducer } from './app-reducer'
import { reducer } from './reducers'

const rootReducer = combineReducers({
  reducer: reducer,
  auth: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  app: appReducer,
  authMe: authReducer,
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
