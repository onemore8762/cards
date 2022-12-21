import React, { useState } from 'react'

import { Button, Card, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { Eye } from '../../../common/components/Eye/Eye'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

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
        <Card sx={{ width: '413px', height: '372px' }} style={{ marginTop: '100px' }}>
          <form onSubmit={formik.handleSubmit} className={s.form}>
            <FormLabel sx={{ display: 'flex', justifyContent: 'center' }}>
              <span className={s.header}>Create new password</span>
            </FormLabel>
            <FormGroup sx={{ marginBottom: '34px', marginTop: '65px' }}>
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

            <Button variant="contained" sx={{ borderRadius: '30px', width: '347px' }} type="submit">
              Create new password
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}
