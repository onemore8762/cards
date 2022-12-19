import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'

import { getPacksTC, setIsMyAC, setPageAC } from '../../../features/PackList/packList-reducer'
import { selectIsMy } from '../../../features/PackList/packListSelectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

type FilterShowPropsType = {
  disabled: boolean
}

export const FilterShow: React.FC<FilterShowPropsType> = ({ disabled }) => {
  const isMy = useAppSelector(selectIsMy)

  const dispatch = useAppDispatch()
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: boolean) => {
    if (newAlignment !== null) {
      dispatch(setIsMyAC(!isMy))
      dispatch(getPacksTC())
      dispatch(setPageAC(1))
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
