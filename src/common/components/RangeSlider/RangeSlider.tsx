import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { getPacksTC, setMaxMinAC } from '../../../features/PackList/packList-reducer'
import style from '../../../features/PackList/PackList.module.css'
import { selectMaxMinFilter } from '../../../features/PackList/packListSelectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDebounce } from '../../hooks/useDebounce'

function valuetext(value: number) {
  return `${value}`
}

type RangeSliderPropsType = {
  disabled: boolean
}

export const RangeSlider: React.FC<RangeSliderPropsType> = ({ disabled }) => {
  const valueMaxMin = useAppSelector(selectMaxMinFilter)
  const [value, setValue] = useState<number[]>(valueMaxMin)
  const debouncedValue = useDebounce<number[]>(value, 1000)
  const dispatch = useAppDispatch()
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  useEffect(() => {
    if (valueMaxMin[0] !== value[0] || valueMaxMin[1] !== value[1]) {
      dispatch(setMaxMinAC(debouncedValue[0], debouncedValue[1]))
      dispatch(getPacksTC())
    }
  }, [debouncedValue])

  useEffect(() => {
    setValue(valueMaxMin)
  }, [valueMaxMin])

  return (
    <>
      <div className={style.values}>{value[0]}</div>
      <div className={style.slider}>
        <Box sx={{ width: 150 }}>
          <Slider
            disabled={disabled}
            getAriaLabel={() => 'Number of cards'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={110}
          />
        </Box>
      </div>
      <div className={style.values}>{value[1]}</div>
    </>
  )
}
