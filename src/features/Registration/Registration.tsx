import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Card,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

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
      if (!values.email) {
        return {
          email: 'Email is required',
        }
      }
      if (!values.password) {
        return {
          password: 'Password is required',
        }
      }
      if (!values.confirmPassword) {
        return {
          confirmPassword: 'confirmPassword is required',
        }
      }
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
        console.log(data)
      }
    },
  })

  const handleClickShowPassword = (value: string) => {
    if (value === 'password') {
      setShowPassword({ ...showPassword, password: !showPassword.password })
    } else if (value === 'confirmPassword') {
      setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })
    }
  }

  if (isLoggedIn) return <Navigate to={'/profile'}></Navigate>

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    formik.handleChange(e)
    dispatch(
      setErrors({
        error: '',
        isEmailValid: true,
        isPassValid: true,
        passwordRegExp: '',
      })
    )
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
                name="email"
                label={'Email'}
                value={formik.values.email}
                onChange={onChangeHandler}
                error={
                  !errors.isEmailValid ||
                  (formik.touched.email && Boolean(formik.errors.email)) ||
                  (errors.isEmailValid && errors.isPassValid && Boolean(errors.error))
                }
                variant="standard"
                margin={'normal'}
                helperText={
                  (formik.touched.email && formik.errors.email) ||
                  (!errors.isEmailValid && 'Email is not valid') ||
                  (errors.isEmailValid && errors.isPassValid && errors.error)
                }
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword.password ? 'text' : 'password'}
                value={formik.values.password}
                onChange={onChangeHandler}
                error={
                  (formik.touched.password && Boolean(formik.errors.password)) ||
                  !errors.isPassValid
                }
                variant="standard"
                margin={'normal'}
                helperText={
                  (formik.touched.password && formik.errors.password) ||
                  (!errors.isPassValid && errors.passwordRegExp)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('password')}
                      >
                        {showPassword.password ? (
                          <VisibilityOff sx={{ color: 'black' }} />
                        ) : (
                          <Visibility sx={{ color: 'black' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                value={formik.values.confirmPassword}
                onChange={onChangeHandler}
                error={
                  (formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)) ||
                  !errors.isPassValid
                }
                variant="standard"
                margin={'normal'}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirmPassword visibility"
                        onClick={() => handleClickShowPassword('confirmPassword')}
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff sx={{ color: 'black' }} />
                        ) : (
                          <Visibility sx={{ color: 'black' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
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
