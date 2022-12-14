import React, { useEffect } from 'react'

import './App.css'
import { LinearProgress } from '@mui/material'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { AdminMenu } from '../common/components/adminMenu/AdminMenu'
import { ErrorSnackBar } from '../common/components/ErrorSnackBar/ErrorSnackBar'
import { NavBar } from '../common/components/NavBar/NavBar'
import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'
import { Error404 } from '../features/Error404/Error404'
import { Login } from '../features/Login/Login'
import { CreateNewPassword } from '../features/Password/CreateNewPassword/CreateNewPassword'
import { CheckEmail } from '../features/Password/RecoveryPassword/CheckEmail'
import { PasswordRecovery } from '../features/Password/RecoveryPassword/Password_recovery'
import { Profile } from '../features/Profile/Profile'
import { Registration } from '../features/Registration/Registration'

export const App = () => {
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  const status = useAppSelector<string>(state => state.app.status)

  // редирект на логин, если не залогинились
  useEffect(() => {
    !isLoggedIn && navigate('/login')
    isLoggedIn && navigate('/profile')
  }, [isLoggedIn])

  return (
    <div className="App">
      <NavBar />
      {status === 'loading' && <LinearProgress />}
      <AdminMenu>
        <div>Login</div>
        <div>Profile</div>
        <div>Registration</div>
        <div>Error404</div>
        <div>CreateNewPassword</div>
        <div>CheckEmail</div>
        <div>PasswordRecovery</div>
      </AdminMenu>
      <div style={{ marginTop: '100px' }}>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/registration'} element={<Registration />} />
          <Route path={'/checkEmail'} element={<CheckEmail />} />
          <Route path={'/createNewPassword'} element={<CreateNewPassword />} />
          <Route path={'/passwordRecovery'} element={<PasswordRecovery />} />
          <Route path={'/error404'} element={<Error404 />} />
          <Route path={'*'} element={<Navigate to={'/error404'} />} />
        </Routes>
      </div>
      {/*<ErrorSnackBar />*/}
    </div>
  )
}
