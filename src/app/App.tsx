import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AdminMenu } from '../common/components/AdminMenu/AdminMenu'
import { ErrorSnackBar } from '../common/components/ErrorSnackBar/ErrorSnackBar'
import { NavBar } from '../common/components/NavBar/NavBar'
import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'
import { Error404 } from '../features/Error404/Error404'
import { Login } from '../features/Login/Login'
import { PackList } from '../features/packList/PackList'
import { CreateNewPassword } from '../features/Password/CreateNewPassword/CreateNewPassword'
import { CheckEmail } from '../features/Password/RecoveryPassword/CheckEmail'
import { RecoveryPassword } from '../features/Password/RecoveryPassword/RecoveryPassword'
import { Profile } from '../features/Profile/Profile'
import { Registration } from '../features/Registration/Registration'

import { initializeAppTC } from './app-reducer'

export const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  // инициализация приложения
  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  // лоадер, если приложение не инициализировано
  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '300px' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <NavBar />
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
          <Route path={'/'} element={<Profile />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/registration'} element={<Registration />} />
          <Route path={'/checkEmail'} element={<CheckEmail />} />
          <Route path={'/createNewPassword'} element={<CreateNewPassword />} />
          <Route path={'/passwordRecovery'} element={<RecoveryPassword />} />
          <Route path={'/error404'} element={<Error404 />} />
          <Route path={'/packlist'} element={<PackList />} />
          <Route path={'*'} element={<Navigate to={'/error404'} />} />
        </Routes>
      </div>
      <ErrorSnackBar />
    </div>
  )
}
