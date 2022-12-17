import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from '../../path/path'

export const PrivateRoutes = () => {
  let auth = { isLoggedIn: true }

  return auth.isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN.LOGIN} />
}
