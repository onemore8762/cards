import React from 'react'

import { Button, Card, FormGroup, FormLabel } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

import checkEmail from '../../../assets/images/checkEmail.svg'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const buttonHandler = () => {
    return navigate('/login')
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: 413, height: 408 }}>
          <FormGroup sx={{ p: 3 }}>
            <FormLabel
              sx={{ display: 'flex', justifyContent: 'center', color: '#000', fontSize: '26px' }}
            >
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '26px',
                  lineHeight: '32px',
                  marginTop: '35px',
                }}
              >
                Check Email
              </span>
            </FormLabel>
            <FormLabel
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <img
                src={checkEmail}
                alt="checkEmail"
                style={{
                  marginTop: '10px',
                }}
              />
              <p
                style={{
                  marginTop: '25px',
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '24px',
                }}
              >
                We’ve sent an Email with instructions to example@mail.com
              </p>
            </FormLabel>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={buttonHandler}
              sx={{ borderRadius: '30px', mt: 3 }}
            >
              Login
            </Button>
          </FormGroup>
        </Card>
      </Grid>
    </Grid>
  )
}
