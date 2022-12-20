import { AppRootStateType } from '../../app/store'

export const selectProfileUserId = (state: AppRootStateType) => state.profile._id
