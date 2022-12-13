import React, { useState } from 'react'

import './App.css'
import { LinearProgress } from '@mui/material'
import { NavLink, Route, Routes } from 'react-router-dom'

import { NavBar } from '../common/components/NavBar/NavBar'
import { Error404 } from '../features/Error404/Error404'
import { Login } from '../features/Login/Login'
import { CreateNewPassword } from '../features/Password/CreateNewPassword/CreateNewPassword'
import { PasswordRecovery } from '../features/Password/Password_recovery'
import { PasswordNew } from '../features/Password/Password_new'
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
      <NavLink to={'/login'}>Login</NavLink>
      <NavLink to={'/profile'}>Profile</NavLink>
      <NavLink to={'/Registration'}>Registration</NavLink>
      <NavLink to={'/Error404'}>Error404</NavLink>
      <NavLink to={'/CreateNewPassword'}>CreateNewPassword</NavLink>
      <NavLink to={'/PasswordNew'}>PasswordNew</NavLink>
      <NavLink to={'/checkEmail'}>checkEmail</NavLink>
      <NavLink to={'/PasswordRecovery'}>PasswordRecovery</NavLink>
      <div>-------------</div>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/Profile'} element={<Profile />} />
        <Route path={'/Registration'} element={<Registration />} />
        <Route path={'/Error404'} element={<Error404 />} />
        <Route path={'/PasswordNew'} element={<PasswordNew />} />
        <Route path={'/checkEmail'} element={<CheckEmail />} />
        <Route path={'/CreateNewPassword'} element={<CreateNewPassword />} />
        <Route path={'/PasswordRecovery'} element={<PasswordRecovery />} />
      </Routes>
    </div>
  )
}
