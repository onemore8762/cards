import React, { useState } from 'react'

import { Button, Card, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { Eye } from '../../../common/components/Eye/Eye'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import {
  CreateNewPassword_DescriptionStyle,
  CreateNewPassword_FormGroupStyle,
  CreateNewPassword_LoginCardStyle,
  Login_FormLabelOneSpanStyle,
  Login_FormLabelOneStyle,
  Login_MainButtonStyle,
  Registration_FormikSubmitStyle,
} from '../../../common/styles/LoginFormStyles'

import { setNewPassword } from './new-password-reducer'
import { selectNewPassword, selectPasswordError } from './newPasswordSelectors'

export const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const onSuccess = useAppSelector(selectNewPassword)
  const error = useAppSelector(selectPasswordError)

  const [showPassword, setShowPassword] = useState<boolean>(false)

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
          <form onSubmit={formik.handleSubmit} style={Registration_FormikSubmitStyle}>
            <FormLabel sx={Login_FormLabelOneStyle}>
              <span style={Login_FormLabelOneSpanStyle}>Create New Password</span>
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
              <div style={CreateNewPassword_DescriptionStyle}>
                Create new password and we will send you further instructions to e-mail
              </div>
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
