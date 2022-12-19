import { AppRootStateType } from '../../app/store'

export const selectUserId = (state: AppRootStateType) => state.profile._id
