import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useDispatch } from 'react-redux'

import { getPacksTC, setMaxMin } from '../../../features/PackList/packList-reducer'
import style from '../../../features/PackList/PackList.module.css'
import { useDebounce } from '../../hooks/useDebounce'

function valuetext(value: number) {
  return `${value}`
}

export const RangeSlider = () => {
  const [value, setValue] = useState<number[]>([0, 100])
  const debouncedValue = useDebounce<number[]>(value, 1000)
  const dispatch = useDispatch()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  useEffect(() => {
    dispatch(setMaxMin(debouncedValue[1], debouncedValue[0]))
    dispatch<any>(getPacksTC())
  }, [debouncedValue])

  return (
    <>
      <div className={style.values}>{value[0]}</div>
      <div className={style.slider}>
        <Box sx={{ width: 150 }}>
          <Slider
            getAriaLabel={() => 'Number of cards'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
      <div className={style.values}>{value[1]}</div>
    </>
  )
}
