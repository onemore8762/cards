import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

type Props = {
  disabled: boolean
}

export const SearchInput: React.FC<Props> = ({ disabled }) => {
  return (
    <div>
      <TextField
        sx={{ width: 415 }}
        id="outlined-basic"
        variant="outlined"
        size="small"
        placeholder="search cards"
        disabled={disabled}
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
