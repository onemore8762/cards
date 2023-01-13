import React from 'react'

import { Button, Card, FormGroup, FormLabel } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'

import checkEmail from '../../../assets/images/checkEmail.svg'
import {
  CheckEmail_FormLabelThreeTextStyle,
  CheckEmail_MainButtonStyle,
  CreateNewPassword_LoginCardStyle,
  Login_FormLabelOneSpanStyle,
  Login_FormLabelOneStyle,
  Login_FormLabelThreeStyle,
} from '../../../common/styles/LoginFormStyles'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const buttonHandler = () => {
    return navigate('/login')
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={CreateNewPassword_LoginCardStyle}>
          <FormGroup sx={{ p: 3 }}>
            <FormLabel sx={Login_FormLabelOneStyle}>
              <span style={Login_FormLabelOneSpanStyle}>Check E-Mail</span>
            </FormLabel>
            <FormLabel sx={Login_FormLabelThreeStyle}>
              <img
                src={checkEmail}
                alt="checkEmail"
                style={{
                  marginTop: '10px',
                }}
              />
              <p style={CheckEmail_FormLabelThreeTextStyle}>
                We’ve sent an Email with instructions to example@mail.com
              </p>
            </FormLabel>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={buttonHandler}
              sx={CheckEmail_MainButtonStyle}
            >
              Login
            </Button>
          </FormGroup>
        </Card>
      </Grid>
    </Grid>
  )
}
