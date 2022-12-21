import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { getPacksTC, setMaxMinAC } from '../../../features/PackList/packList-reducer'
import style from '../../../features/PackList/PackList.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDebounce } from '../../hooks/useDebounce'

import { selectMaxCardsCount, selectMinCardsCount } from './rangeSelector'

function valuetext(value: number) {
  return `${value}`
}

type RangeSliderPropsType = {
  disabled: boolean
}

export const RangeSlider: React.FC<RangeSliderPropsType> = ({ disabled }) => {
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])
  const debouncedValue = useDebounce<number[]>(value, 1000)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (minCardsCount !== value[0] || maxCardsCount !== value[1]) {
      dispatch(getPacksTC(debouncedValue[0], debouncedValue[1])) // {max:}
    }
  }, [debouncedValue])
  useEffect(() => {
    setValue([minCardsCount, maxCardsCount])
    dispatch(setMaxMinAC(minCardsCount, maxCardsCount))
  }, [minCardsCount, maxCardsCount])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

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
            min={minCardsCount}
            max={maxCardsCount}
          />
        </Box>
      </div>
      <div className={style.values}>{value[1]}</div>
    </>
  )
}
