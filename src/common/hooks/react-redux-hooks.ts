import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppRootStateType, AppThunkDispatch } from '../../app/store'

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
