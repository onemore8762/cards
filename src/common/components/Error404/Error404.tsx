import React from 'react'

import { Box, Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import image404 from '../../../assets/images/404.svg'

import s from './Error404.module.css'

export const Error404 = () => {
  let navigate = useNavigate()

  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center" gap={'62px'}>
        <Box>
          <Box sx={{ marginBottom: '36px' }}>
            <span className={s.header}>Ooops!</span>
            <p className={s.description}>Sorry! Page not found!</p>
          </Box>
          <Button
            className={s.button}
            variant="contained"
            sx={{ borderRadius: '30px' }}
            onClick={() => {
              navigate('/profile')
            }}
          >
            Back to home page
          </Button>
        </Box>
        <img src={image404} alt={'image-error404'} />
      </Grid>
    </Grid>
  )
}
