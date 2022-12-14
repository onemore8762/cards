import React, { useEffect } from 'react'

import './App.css'
import { LinearProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

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

import { initializeAppTC } from './app-reducer'

export const App = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<string>(state => state.app.status)

  // // инициализация приложения
  // useEffect(() => {
  //   dispatch(initializeAppTC())
  // }, [])

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
          <Route path={'/error404'} element={<Error404 />} />
          <Route path={'/checkEmail'} element={<CheckEmail />} />
          <Route path={'/createNewPassword'} element={<CreateNewPassword />} />
          <Route path={'/passwordRecovery'} element={<PasswordRecovery />} />
        </Routes>
      </div>
      {/*<ErrorSnackBar />*/}
    </div>
  )
}
