import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { setUpdatePackAC } from '../../../features/Packs/PackList/packList-reducer'
import { selectPackListIsMy } from '../../../features/Packs/PackList/packListSelectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { FilterShow_ButtonStyle } from './FilterShowStyles'

type FilterShowPropsType = {
  disabled: boolean
}

export const FilterShow: React.FC<FilterShowPropsType> = ({ disabled }) => {
  const isMy = useAppSelector(selectPackListIsMy)
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: boolean) => {
    if (newAlignment !== isMy) {
      dispatch(setUpdatePackAC({ isMy: newAlignment, page: 1, min: null, max: null, pageCount: 4 }))
      searchParams.set('isMy', `${newAlignment}`)
      searchParams.delete('min')
      searchParams.delete('max')
      searchParams.delete('page')
      searchParams.delete('pageCount')
      setSearchParams(searchParams)
    }
  }

  return (
    <ToggleButtonGroup
      disabled={disabled}
      color="primary"
      value={isMy}
      exclusive
      aria-label="Platform"
    >
      <ToggleButton sx={FilterShow_ButtonStyle} onClick={handleChange} value={true} selected={isMy}>
        My
      </ToggleButton>
      <ToggleButton
        sx={FilterShow_ButtonStyle}
        onClick={handleChange}
        value={false}
        selected={!isMy}
      >
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
