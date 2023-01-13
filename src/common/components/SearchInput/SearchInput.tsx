import React, { ChangeEvent } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

type Props = {
  disabled?: boolean
  search: string | null
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  sx?: {
    width: string
  }
  clearInputValue: () => void
}

export const SearchInput: React.FC<Props> = ({
  disabled,
  search,
  searchHandler,
  placeholder,
  sx,
  clearInputValue,
}) => {
  return (
    <div>
      <TextField
        sx={sx}
        id="outlined-basic"
        variant="outlined"
        size="small"
        style={{ height: '38px' }}
        placeholder={placeholder}
        disabled={disabled}
        value={search || ''}
        onChange={searchHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" style={{ cursor: 'pointer' }}>
              <ClearIcon onClick={() => clearInputValue()} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}
