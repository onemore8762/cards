import * as React from 'react'

import { AdminMenu } from './AdminMenu'

export const AdminMenuMain = () => {
  return (
    <AdminMenu>
      <div>Profile</div>
      <div>Error404</div>
      <div>Login</div>
      <div>Registration</div>
      <div>CreateNewPassword/testToken</div>
      <div>CheckEmail</div>
      <div>RecoveryPassword</div>
    </AdminMenu>
  )
}
