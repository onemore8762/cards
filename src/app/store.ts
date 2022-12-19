import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { LoginActionType, loginReducer } from '../features/Login/login-reducer'
import { PackActionType, packReducer } from '../features/PackList/Pack/pack-reducer'
import { PackListActionType, packListReducer } from '../features/PackList/packList-reducer'
import {
  NewPasswordActionType,
  newPasswordReducer,
} from '../features/Password/CreateNewPassword/new-password-reducer'
import {
  RecoveryActionType,
  recoveryReducer,
} from '../features/Password/RecoveryPassword/recovery-reducer'
import { ProfileActionType, profileReducer } from '../features/Profile/profile-reducer'
import {
  RegistrationActionType,
  registrationReducer,
} from '../features/Registration/registration-reducer'

import { ApplicationActionType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  recovery: recoveryReducer,
  newPassword: newPasswordReducer,
  app: appReducer,
  profile: profileReducer,
  packList: packListReducer,
  pack: packReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionType
>

export type AppActionType =
  | ApplicationActionType
  | LoginActionType
  | ProfileActionType
  | RegistrationActionType
  | NewPasswordActionType
  | RecoveryActionType
  | PackListActionType
  | PackActionType

// @ts-ignore
window.store = store
