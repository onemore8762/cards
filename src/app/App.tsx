import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AdminMenuMain } from '../common/components/AdminMenu/AdminMenuMain'
import { Error404 } from '../common/components/Error404/Error404'
import { ErrorSnackBar } from '../common/components/ErrorSnackBar/ErrorSnackBar'
import { NavBar } from '../common/components/NavBar/NavBar'
import { PrivateRoutes } from '../common/components/PrivateRoutes/PrivateRoutes'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { PATH } from '../common/path/path'
import s from '../common/styles/CommonStyles.module.css'
import { Login } from '../features/Login/Login'
import { Card } from '../features/Packs/Card/Card'
import { CardQuestion } from '../features/Packs/LearnPack/CardQuestion'
import { PackList } from '../features/Packs/PackList/PackList'
import { CreateNewPassword } from '../features/Password/CreateNewPassword/CreateNewPassword'
import { CheckEmail } from '../features/Password/RecoveryPassword/CheckEmail'
import { RecoveryPassword } from '../features/Password/RecoveryPassword/RecoveryPassword'
import { Profile } from '../features/Profile/Profile'
import { Registration } from '../features/Registration/Registration'

import { initializeAppTC } from './app-reducer'
import { selectAppInitialize } from './appSelectors'

export const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectAppInitialize)

  // initialize app
  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  // app loader
  if (!isInitialized) {
    return (
      <div className={s.circularApp}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <NavBar />
      <AdminMenuMain />
      <div>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path={'/'} element={<PackList />} />
            <Route path={PATH.PROFILE.PROFILE} element={<Profile />} />
            <Route path={PATH.PROFILE.PACKLIST} element={<PackList />} />
            <Route path={PATH.PROFILE.CARD} element={<Card />} />
            <Route path={PATH.LEARN.QUESTION} element={<CardQuestion />} />
          </Route>
          <Route path={PATH.LOGIN.LOGIN} element={<Login />} />
          <Route path={PATH.LOGIN.REGISTRATION} element={<Registration />} />
          <Route path={PATH.LOGIN.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.LOGIN.CREATE_NEW_PASSWORD} element={<CreateNewPassword />} />
          <Route path={PATH.LOGIN.RECOVERY_PASSWORD} element={<RecoveryPassword />} />
          <Route path={PATH.COMMON.ERROR404} element={<Error404 />} />
          <Route path={'*'} element={<Navigate to={PATH.COMMON.ERROR404} />} />
        </Routes>
      </div>
      <ErrorSnackBar />
    </div>
  )
}
