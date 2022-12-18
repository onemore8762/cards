import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import style from '../../../features/PackList/PackList.module.css'

function valuetext(value: number) {
  return `${value}`
}

export const RangeSlider = () => {
  const [value, setValue] = useState<number[]>([0, 100])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

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
