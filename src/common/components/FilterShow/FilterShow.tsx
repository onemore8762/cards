import React, { useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch } from 'react-redux'

import { getPacksTC, setIsMy } from '../../../features/PackList/packList-reducer'

export const FilterShow = () => {
  const [alignment, setAlignment] = useState(false)

  const dispatch = useDispatch()
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: boolean) => {
    if (newAlignment !== null) {
      dispatch(setIsMy(newAlignment))
      dispatch<any>(getPacksTC())

      setAlignment(newAlignment)
    }
  }
  const styleButtons = { width: '98px', height: '36px', color: 'black' }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton sx={styleButtons} value={true}>
        My
      </ToggleButton>
      <ToggleButton sx={styleButtons} value={false}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
