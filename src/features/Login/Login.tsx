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
import { NavLink } from 'react-router-dom'

interface State {
  amount: string
  password: string
  weight: string
  weightRange: string
  showPassword: boolean
}

export const Login = () => {
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: 413, height: 552 }}>
          <form>
            <FormGroup sx={{ p: 3 }}>
              <FormLabel
                sx={{ display: 'flex', justifyContent: 'center', color: '#000', fontSize: '26px' }}
              >
                <h2>Sign in</h2>
              </FormLabel>
              <TextField label="Email" margin="normal" variant="standard" />

              <FormControl variant="standard" margin="normal">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                  //{...formik.getFieldProps('rememberMe')}
                  //checked={formik.values.rememberMe}
                  />
                }
              />
              <FormLabel sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 5 }}>
                <NavLink
                  to={'/PasswordRecovery'}
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
                <p>Already have an account?</p>
                <NavLink to={'/Registration'} style={{ color: '#366EFF' }}>
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
