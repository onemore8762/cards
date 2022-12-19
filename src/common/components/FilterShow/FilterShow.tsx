import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch } from 'react-redux'

import { getPacksTC, setIsMy, setPage } from '../../../features/PackList/packList-reducer'
import { useAppSelector } from '../../hooks/useAppSelector'
type Props = {
  disabled: boolean
}

export const FilterShow: React.FC<Props> = ({ disabled }) => {
  const isMy = useAppSelector(state => state.packList.isMy)

  const dispatch = useDispatch()
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: boolean) => {
    if (newAlignment !== null) {
      dispatch(setIsMy(!isMy))
      dispatch<any>(getPacksTC())
      dispatch(setPage(1))
    }
  }
  const styleButtons = { width: '98px', height: '36px', color: 'black' }

  return (
    <ToggleButtonGroup
      disabled={disabled}
      color="primary"
      value={isMy}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton sx={styleButtons} value={true} selected={isMy}>
        My
      </ToggleButton>
      <ToggleButton sx={styleButtons} value={false} selected={!isMy}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
