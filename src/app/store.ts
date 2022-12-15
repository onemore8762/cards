import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

// import { profileReducer } from '../features/Auth/auth-reducer'
import { loginReducer } from '../features/Login/login-reducer'
import { newPasswordReducer } from '../features/Password/CreateNewPassword/new-password-reducer'
import { recoveryReducer } from '../features/Password/RecoveryPassword/recovery-reducer'
import { profileReducer } from '../features/Profile/profile-reducer'
import { registrationReducer } from '../features/Registration/registration-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  recovery: recoveryReducer,
  newPassword: newPasswordReducer,
  app: appReducer,
  profile: profileReducer,
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

// export type AppActionType =
//   | LoginActionType
//   | ProfileActionType
//   | AuthActionType
//   | ApplicationActionType

// @ts-ignore
window.store = store
