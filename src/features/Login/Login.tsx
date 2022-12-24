import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { PATH } from '../../common/path/path'

import { loginTC } from './login-reducer'

interface State {
  showPassword: boolean
}

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const [values, setValues] = React.useState<State>({
    showPassword: false,
  })
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const authError = useAppSelector(state => state.login.error)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Invalid password'
      }

      return errors
    },
    onSubmit: values => {
      //alert(JSON.stringify(values))
      dispatch(loginTC(values))
    },
  })

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE.PACKLIST} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: '413px', height: '528px' }} style={{ marginTop: '100px' }}>
          <form onSubmit={formik.handleSubmit} style={{ padding: '10px 20px 0 20px' }}>
            <FormGroup sx={{ p: 2 }}>
              <FormLabel
                sx={{ display: 'flex', justifyContent: 'center', color: '#000', fontSize: '26px' }}
              >
                <span style={{ color: '#000', fontSize: '26px', fontWeight: '600' }}>Sign In</span>
              </FormLabel>
              <TextField
                label="Email"
                margin="normal"
                variant="standard"
                helperText={formik.touched.email && formik.errors.email && formik.errors.email}
                {...formik.getFieldProps('email')}
                // onBlur={formik.handleBlur}
              />
              {/*{formik.touched.email && authError && <div style={{ color: 'red' }}>{authError}</div>}*/}
              <FormControl variant="standard" margin="normal">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  onBlur={formik.handleBlur}
                  style={{ marginBottom: '20px' }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff sx={{ color: 'black' }} />
                        ) : (
                          <Visibility sx={{ color: 'black' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    //checked={formik.values.rememberMe}
                  />
                }
              />
              <FormLabel sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 5 }}>
                <NavLink
                  to={PATH.LOGIN.RECOVERY_PASSWORD}
                  style={{ color: '#000000', textDecoration: 'none' }}
                >
                  Forgot Password?
                </NavLink>
              </FormLabel>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{ borderRadius: '30px' }}
              >
                Login
              </Button>
              <FormLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: 2,
                  mb: 5,
                }}
              >
                <p style={{ fontWeight: '600', opacity: '50%' }}>Already have an account?</p>
                <NavLink to={'/Registration'} style={{ color: '#366EFF', fontWeight: '600' }}>
                  Sign Up
                </NavLink>
              </FormLabel>
            </FormGroup>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}
