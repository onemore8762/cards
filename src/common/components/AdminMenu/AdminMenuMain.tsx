import * as React from 'react'

import { AdminMenu } from './AdminMenu'

export const AdminMenuMain = () => {
  return (
    <AdminMenu>
      <div>Login</div>
      <div>Profile</div>
      <div>Registration</div>
      <div>Error404</div>
      <div>CreateNewPassword</div>
      <div>CheckEmail</div>
      <div>PasswordRecovery</div>
    </AdminMenu>
  )
}
