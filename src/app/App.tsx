import React from 'react'
import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Login from '../features/Login/Login'
import { Profile } from '../features/Profile/Profile'
import { Registration } from '../features/Registration/Registration'
import { Error404 } from '../features/Error404/Error404'
import { PasswordNew } from '../features/Password/Password_new'
import { PasswordRecovery } from '../features/Password/Password_recovery'

function App() {
  return (
    <div className="App">
      <NavLink to={'/login'}>Login</NavLink>
      <NavLink to={'/profile'}>Profile</NavLink>
      <NavLink to={'/Registration'}>Registration</NavLink>
      <NavLink to={'/Error404'}>Error404</NavLink>
      <NavLink to={'/PasswordNew'}>PasswordNew</NavLink>
      <NavLink to={'/PasswordRecovery'}>PasswordRecovery</NavLink>
      <div>-------------</div>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/Profile'} element={<Profile />} />
        <Route path={'/Registration'} element={<Registration />} />
        <Route path={'/Error404'} element={<Error404 />} />
        <Route path={'/PasswordNew'} element={<PasswordNew />} />
        <Route path={'/PasswordRecovery'} element={<PasswordRecovery />} />
      </Routes>
    </div>
  )
}

export default App
