import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useDispatch } from 'react-redux'

import { getPacksTC, setMaxMin } from '../../../features/PackList/packList-reducer'
import style from '../../../features/PackList/PackList.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDebounce } from '../../hooks/useDebounce'

function valuetext(value: number) {
  return `${value}`
}
const selector = (state: any) => [state.packList.min, state.packList.max]

export const RangeSlider = () => {
  const valueMaxMin = useAppSelector(selector)

  const [value, setValue] = useState<number[]>(valueMaxMin)
  const debouncedValue = useDebounce<number[]>(value, 1000)
  const dispatch = useDispatch()
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  useEffect(() => {
    if (valueMaxMin[0] !== value[0] || valueMaxMin[1] !== value[1]) {
      dispatch(setMaxMin(debouncedValue[0], debouncedValue[1]))
      dispatch<any>(getPacksTC())
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
