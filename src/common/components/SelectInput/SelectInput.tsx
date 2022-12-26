import React, { useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export const SelectInput = () => {
  const [questionType, setQuestionType] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Choose a Question Format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={questionType}
          label="Choose a Question Format"
          onChange={handleChange}
        >
          <MenuItem value={'text'}>Text</MenuItem>
          <MenuItem value={'image'}>Image</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
