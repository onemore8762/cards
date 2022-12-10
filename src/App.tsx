import React from 'react'
import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import { Profile } from './components/Profile/Profile'
import { SuperComponents } from './components/SuperComponents'
import { Registration } from './components/Registration/Registration'
import { Error404 } from './components/Error404/Error404'
import { PasswordNew } from './components/Password/Password_new'
import { PasswordRecovery } from './components/Password/Password_recovery'

function App() {
  return (
    <div className="App">
      <NavLink to={'/login'}>Login</NavLink>
      <NavLink to={'/profile'}>Profile</NavLink>
      <NavLink to={'/Registration'}>Registration</NavLink>
      <NavLink to={'/Error404'}>Error404</NavLink>
      <NavLink to={'/PasswordNew'}>PasswordNew</NavLink>
      <NavLink to={'/PasswordRecovery'}>PasswordRecovery</NavLink>
      <NavLink to={'/SuperComponents'}>SuperComponents</NavLink>
      <div>-------------</div>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/Profile'} element={<Profile />} />
        <Route path={'/Registration'} element={<Registration />} />
        <Route path={'/Error404'} element={<Error404 />} />
        <Route path={'/PasswordNew'} element={<PasswordNew />} />
        <Route path={'/PasswordRecovery'} element={<PasswordRecovery />} />
        <Route path={'/SuperComponents'} element={<SuperComponents />} />
      </Routes>
    </div>
  )
}

export default App
