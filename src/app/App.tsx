import React, { useState } from 'react'

import './App.css'
import { LinearProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import { AdminMenu } from '../common/components/adminMenu/AdminMenu'
import { NavBar } from '../common/components/NavBar/NavBar'
import { Error404 } from '../features/Error404/Error404'
import { Login } from '../features/Login/Login'
import { CreateNewPassword } from '../features/Password/CreateNewPassword/CreateNewPassword'
import { CheckEmail } from '../features/Password/recoveryPassword/CheckEmail'
import { PasswordRecovery } from '../features/Password/recoveryPassword/Password_recovery'
import { Profile } from '../features/Profile/Profile'
import { Registration } from '../features/Registration/Registration'

export const App = () => {
  const [progress, setProgress] = useState<boolean>(false)

  return (
    <div className="App">
      <NavBar />
      {progress ? <LinearProgress /> : ''}
      <div></div>
      <AdminMenu>
        <div>Login</div>
        <div>Profile</div>
        <div>Registration</div>
        <div>Error404</div>
        <div>CreateNewPassword</div>
        <div>CheckEmail</div>
        <div>PasswordRecovery</div>
      </AdminMenu>
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
  )
}
