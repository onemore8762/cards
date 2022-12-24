import React, { memo, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useSearchParams } from 'react-router-dom'

import { setUpdatePackAC } from '../../../features/Packs/PackList/packList-reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { selectMaxCardsCount, selectMinCardsCount } from './rangeSelector'
import s from './RangeSlider.module.css'

function valuetext(value: number) {
  return `${value}`
}

type RangeSliderPropsType = {
  disabled: boolean
}

export const RangeSlider: React.FC<RangeSliderPropsType> = memo(({ disabled }) => {
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const [searchParams, setSearchParams] = useSearchParams()

  const min = Number(searchParams.get('min')) || minCardsCount
  const max = Number(searchParams.get('max')) || maxCardsCount

  const [value, setValue] = useState<number[]>([min, max])
  const dispatch = useAppDispatch()

  useEffect(() => {
    setValue([min, max])
  }, [min, max])

  const handleChange = (event: any, newValue: number[] | number) => {
    setValue(newValue as number[])
  }

  const onChangeCommitted = (event: Event | React.SyntheticEvent, newValue: number[] | number) => {
    dispatch(setUpdatePackAC({ min: (newValue as number[])[0], max: (newValue as number[])[1] }))
    searchParams.set('min', `${(newValue as number[])[0]}`)
    searchParams.set('max', `${(newValue as number[])[1]}`)
    setSearchParams(searchParams)
  }

  return (
    <>
      <div className={s.values}>{value[0]}</div>
      <div className={s.slider}>
        <Box sx={{ width: 150 }}>
          <Slider
            disabled={disabled}
            getAriaLabel={() => 'Number of cards'}
            value={value}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={minCardsCount}
            max={maxCardsCount}
            onChange={handleChange}
            onChangeCommitted={onChangeCommitted}
          />
        </Box>
      </div>
      <div className={s.values}>{value[1]}</div>
    </>
  )
})
