import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'

type PropsType = {
  show: boolean
  handleClickShow: () => void
}

export const Eye: React.FC<PropsType> = ({ show, handleClickShow }) => {
  let color = { color: 'black' }

  return (
    <InputAdornment position="end">
      <IconButton aria-label="toggle confirmPassword visibility" onClick={handleClickShow}>
        {show ? <VisibilityOff sx={color} /> : <Visibility sx={color} />}
      </IconButton>
    </InputAdornment>
  )
}
