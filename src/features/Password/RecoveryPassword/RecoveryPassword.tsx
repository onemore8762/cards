import React, { useEffect } from 'react'

import { Button, Card, FormGroup, FormLabel, TextField } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useFormik } from 'formik'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/path/path'
import {
  Login_FormLabelOneSpanStyle,
  Login_FormLabelOneStyle,
  Login_FormLabelThreeNavLinkStyle,
  Login_FormLabelThreeStyle,
  Login_FormLabelThreeTextStyle,
  Recovery_FormLabelThreeStyle,
  Recovery_FormLabelThreeTextStyle,
  Recovery_LoginCardStyle,
  Recovery_MainButtonStyle,
} from '../../../common/styles/LoginFormStyles'

import { recoveryTC } from './recovery-reducer'
import { selectRecoveryPassError, selectRecoveryPassword } from './recoveryPasswordSelectors'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const RecoveryPassword = () => {
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
      dispatch(recoveryTC(values.email))
    },
  })

  if (success) {
    return <Navigate to={PATH.LOGIN.CHECK_EMAIL} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={Recovery_LoginCardStyle}>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ p: 3 }}>
              <FormLabel sx={Login_FormLabelOneStyle}>
                <span style={Login_FormLabelOneSpanStyle}>Forgot Your Password?</span>
              </FormLabel>
              <TextField
                label="E-Mail"
                margin="normal"
                variant="standard"
                sx={{ mt: 4 }}
                {...formik.getFieldProps('email')}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              )}
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <FormLabel sx={Recovery_FormLabelThreeStyle}>
                <div>Enter your e-mail address and we will send you further instructions </div>
              </FormLabel>
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={Recovery_MainButtonStyle}
              >
                Send Instructions
              </Button>
              <FormLabel sx={Login_FormLabelThreeStyle}>
                <div style={Recovery_FormLabelThreeTextStyle}>Did you remember your password?</div>
                <NavLink to={'/login'} style={Login_FormLabelThreeNavLinkStyle}>
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
