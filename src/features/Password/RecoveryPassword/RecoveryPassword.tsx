import React, { useEffect } from 'react'

import { Button, Card, FormGroup, FormLabel, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useFormik } from 'formik'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/path/path'

import { recoveryTC } from './recovery-reducer'
import { selectRecoveryPassError, selectRecoveryPassword } from './recoveryPasswordSelectors'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const RecoveryPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const success = useAppSelector(selectRecoveryPassword)
  const error = useAppSelector(selectRecoveryPassError)
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      //alert(JSON.stringify(values))
      dispatch(recoveryTC(values.email))
    },
  })

  // useEffect(() => {
  //   if (success) {
  //     navigate(PATH.LOGIN.CHECK_EMAIL)
  //   }
  // }, [])

  if (success) {
    return <Navigate to={PATH.LOGIN.CHECK_EMAIL} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: 413, height: 456 }} style={{ marginTop: '100px' }}>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ p: 3 }}>
              <FormLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#000',
                }}
              >
                <span style={{ fontSize: '26px', fontWeight: '600', lineHeight: '32px' }}>
                  Forgot your password?
                </span>
              </FormLabel>
              <TextField
                label="Email"
                margin="normal"
                variant="standard"
                sx={{ mt: 6 }}
                {...formik.getFieldProps('email')}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <FormLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: 0,
                }}
              >
                <p>Enter your email address and we will send you further instructions </p>
              </FormLabel>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{ borderRadius: '30px', mt: 4 }}
              >
                Send Instructions
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
                <p style={{ marginTop: '31px' }}>Did you remember your password?</p>
                <NavLink
                  to={'/login'}
                  style={{
                    color: '#366EFF',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '24px',
                    marginTop: '11px',
                  }}
                >
                  Try logging in
                </NavLink>
              </FormLabel>
            </FormGroup>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}
