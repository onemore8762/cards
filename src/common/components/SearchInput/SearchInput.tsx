import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

export const SearchInput = () => {
  // const searchHandler = () => {
  //   alert('search')
  // }

  return (
    <div>
      <TextField
        sx={{ width: 415 }}
        id="outlined-basic"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}
