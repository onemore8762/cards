import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'

export const RadioGroupSelect = () => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Rate Yourself</FormLabel>
      <RadioGroup
        // aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Did not know"
        name="radio-buttons-group"
      >
        <FormControlLabel value="Did not know" control={<Radio />} label="Did not know" />
        <FormControlLabel value="Forgot" control={<Radio />} label="Forgot" />
        <FormControlLabel value="A lot of thought" control={<Radio />} label="A lot of thought" />
        <FormControlLabel value="Сonfused" control={<Radio />} label="Сonfused" />
        <FormControlLabel value="Knew the answer" control={<Radio />} label="Knew the answer" />
      </RadioGroup>
    </FormControl>
  )
}
