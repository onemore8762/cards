import React, { useState } from 'react'

import { Button, Card, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { Eye } from '../../../common/components/Eye/Eye'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import {
  CreateNewPassword_FormGroupStyle,
  CreateNewPassword_LoginCardStyle,
  Login_FormLabelOneStyle,
  Login_MainButtonStyle,
} from '../../../common/styles/LoginFormStyles'

import s from './CreateNewPassword.module.css'
import { setNewPassword } from './new-password-reducer'
import { selectNewPassword, selectPasswordError } from './newPasswordSelectors'

export const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const onSuccess = useAppSelector(selectNewPassword)
  const error = useAppSelector(selectPasswordError)
  const params = useParams()

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      if (!values.password) return { password: 'Password is required' }
    },
    onSubmit: values => {
      dispatch(
        setNewPassword({ password: values.password, resetPasswordToken: params.token || '' })
      )
    },
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  if (onSuccess) return <Navigate to={'/profile'}></Navigate>

  return (
    <Grid container justifyContent="center">
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={CreateNewPassword_LoginCardStyle}>
          <form onSubmit={formik.handleSubmit} className={s.form}>
            <FormLabel sx={Login_FormLabelOneStyle}>
              <span className={s.header}>Create New Password</span>
            </FormLabel>
            <FormGroup sx={CreateNewPassword_FormGroupStyle}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                error={
                  (formik.touched.password && Boolean(formik.errors.password)) || Boolean(error)
                }
                {...formik.getFieldProps('password')}
                variant="standard"
                margin={'normal'}
                helperText={(formik.touched.password && formik.errors.password) || error}
                InputProps={{
                  endAdornment: (
                    <Eye show={showPassword} handleClickShow={handleClickShowPassword} />
                  ),
                }}
              />
              <p className={s.description}>
                Create new password and we will send you further instructions to email
              </p>
            </FormGroup>

            <Button variant="contained" sx={Login_MainButtonStyle} type="submit">
              Create New Password
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}
