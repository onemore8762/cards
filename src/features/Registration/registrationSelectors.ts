import { AppRootStateType } from '../../app/store'

export const selectRegistrationIsLoggedIn = (state: AppRootStateType) =>
  state.registration.isLoggedIn
export const selectRegistrationErrors = (state: AppRootStateType) => state.registration.errors
