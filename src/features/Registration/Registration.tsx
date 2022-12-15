import React, { useState } from 'react'

import { Button, Card, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { Eye } from '../../common/components/Eye/Eye'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'

import { registrationUser, setErrors } from './registration-reducer'

export const Registration = () => {
  const [showPassword, setShowPassword] = useState<any>({
    password: false,
    confirmPassword: false,
  })
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.registration.isLoggedIn)
  const errors = useAppSelector(state => state.registration.errors)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      if (!values.email) return { email: 'Email is required' }
      if (!values.password) return { password: 'Password is required' }
      if (!values.confirmPassword) return { confirmPassword: 'confirmPassword is required' }
    },
    onSubmit: (values, { setErrors }) => {
      if (values.password !== values.confirmPassword) {
        setErrors({
          password: "is don't match",
          confirmPassword: "is don't match",
        })
      } else {
        let { confirmPassword, ...data } = values

        dispatch(registrationUser(data))
      }
    },
  })

  const handleClickShowPassword = (value: string) => {
    switch (value) {
      case 'password':
        setShowPassword({ ...showPassword, password: !showPassword.password })
        break
      case 'confirmPassword':
        setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })
        break
    }
  }

  if (isLoggedIn) return <Navigate to={'/login'}></Navigate>

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    formik.handleChange(e)
    if (errors.error || !errors.isEmailValid || !errors.isPassValid || errors.passwordRegExp) {
      dispatch(
        setErrors({
          error: '',
          isEmailValid: true,
          isPassValid: true,
          passwordRegExp: '',
        })
      )
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: '413px', height: '528px' }}>
          <form onSubmit={formik.handleSubmit} style={{ padding: '33px 35px 0' }}>
            <FormLabel sx={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ color: '#000', fontSize: '26px', fontWeight: '600' }}>Sign Up</span>
            </FormLabel>
            <FormGroup sx={{ marginBottom: '68px' }}>
              <TextField
                fullWidth
                id="email"
                label={
                  (formik.touched.email && formik.errors.email) ||
                  (!errors.isEmailValid && 'Email is not valid') ||
                  (errors.isEmailValid && errors.isPassValid && errors.error) ||
                  'Email'
                }
                error={
                  !errors.isEmailValid ||
                  (formik.touched.email && Boolean(formik.errors.email)) ||
                  (errors.isEmailValid && errors.isPassValid && Boolean(errors.error))
                }
                {...formik.getFieldProps('email')}
                onChange={onChangeHandler}
                variant="standard"
                margin={'normal'}
              />
              <TextField
                fullWidth
                id="password"
                label="Password"
                type={showPassword.password ? 'text' : 'password'}
                error={
                  (formik.touched.password && Boolean(formik.errors.password)) ||
                  !errors.isPassValid
                }
                {...formik.getFieldProps('password')}
                onChange={onChangeHandler}
                variant="standard"
                margin={'normal'}
                helperText={
                  (formik.touched.password && formik.errors.password) ||
                  (!errors.isPassValid && errors.passwordRegExp)
                }
                InputProps={{
                  endAdornment: (
                    <Eye
                      show={showPassword.password}
                      handleClickShow={() => handleClickShowPassword('password')}
                    />
                  ),
                }}
              />
              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm password"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                error={
                  (formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)) ||
                  !errors.isPassValid
                }
                {...formik.getFieldProps('confirmPassword')}
                onChange={onChangeHandler}
                variant="standard"
                margin={'normal'}
                helperText={
                  (formik.touched.confirmPassword && formik.errors.confirmPassword) ||
                  (!errors.isPassValid && errors.passwordRegExp)
                }
                InputProps={{
                  endAdornment: (
                    <Eye
                      show={showPassword.confirmPassword}
                      handleClickShow={() => handleClickShowPassword('confirmPassword')}
                    />
                  ),
                }}
              />
            </FormGroup>
            <Button variant="contained" sx={{ borderRadius: '30px', width: '347px' }} type="submit">
              Sign Up
            </Button>
            <FormLabel
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <p style={{ fontWeight: '600', opacity: '50%' }}>Already have an account?</p>
              <NavLink to={'/Login'} style={{ color: '#366EFF', fontWeight: '600' }}>
                Sign In
              </NavLink>
            </FormLabel>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}
