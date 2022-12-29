import { ChangeEvent } from 'react'

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { setGradeAC } from '../../../features/Packs/LearnPack/learnPack-reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

export const RadioGroupSelect = () => {
  const dispatch = useAppDispatch()

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setGradeAC(e.currentTarget.value))
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Rate Yourself</FormLabel>
      <RadioGroup defaultValue={1} name="radio-buttons-group" onChange={handleRadioChange}>
        <FormControlLabel value={1} control={<Radio />} label="Did not know" />
        <FormControlLabel value={2} control={<Radio />} label="Forgot" />
        <FormControlLabel value={3} control={<Radio />} label="A lot of thought" />
        <FormControlLabel value={4} control={<Radio />} label="Сonfused" />
        <FormControlLabel value={5} control={<Radio />} label="Knew the answer" />
      </RadioGroup>
    </FormControl>
  )
}
