import { ChangeEvent } from 'react'

import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { useParams } from 'react-router-dom'

import { updateGradeTC } from '../../../features/Packs/LearnPack/learn-pack-reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

export const RadioGroupSelect = () => {
  const dispatch = useAppDispatch()
  const { packId } = useParams()

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (packId) dispatch(updateGradeTC(packId, e.currentTarget.value))
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
