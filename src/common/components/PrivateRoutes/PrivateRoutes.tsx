import { Navigate, Outlet } from 'react-router-dom'

import { selectIsLoggedIn } from '../../../features/Login/loginSelectors'
import { useAppSelector } from '../../hooks/useAppSelector'
import { PATH } from '../../path/path'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN.LOGIN} />
}
