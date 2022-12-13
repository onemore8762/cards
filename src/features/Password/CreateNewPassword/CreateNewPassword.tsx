import React, { useEffect, useState } from 'react'

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
import { Navigate, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'

import { setNewPassword } from './new-password-reducer'

export const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState<string>('')
  const dispatch = useAppDispatch()
  const onSuccess = useAppSelector(state => state.newPassword.onSuccess)
  const error = useAppSelector(state => state.newPassword.error)

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    const key = Object.keys(params)

    setToken(params[key[0]])
  }, [])

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      if (!values.password) {
        return {
          password: 'Password is required',
        }
      }
    },
    onSubmit: values => {
      dispatch(setNewPassword({ password: values.password, resetPasswordToken: token }))
    },
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  if (onSuccess) return <Navigate to={'/profile'}></Navigate>

  return (
    <Grid container justifyContent="center">
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: '413px', height: '372px' }}>
          <form onSubmit={formik.handleSubmit} style={{ padding: '33px 35px 0' }}>
            <FormLabel sx={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ color: '#000', fontSize: '26px', fontWeight: '600' }}>
                Create new password
              </span>
            </FormLabel>
            <FormGroup sx={{ marginBottom: '34px', marginTop: '65px' }}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  (formik.touched.password && Boolean(formik.errors.password)) || Boolean(error)
                }
                variant="standard"
                margin={'normal'}
                helperText={(formik.touched.password && formik.errors.password) || error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: 'black' }} />
                        ) : (
                          <Visibility sx={{ color: 'black' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <p style={{ fontWeight: '600', opacity: '50%' }}>
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
