import React, { ChangeEvent } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

type Props = {
  disabled: boolean
  search: string
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void
  sx?: {
    width: string
  }
}

export const SearchInput: React.FC<Props> = ({ disabled, search, searchHandler, sx }) => {
  return (
    <div>
      <TextField
        // sx={{ width: 415 }}
        sx={sx}
        id="outlined-basic"
        variant="outlined"
        size="small"
        style={{ height: '38px' }}
        placeholder="search pack"
        disabled={disabled}
        value={search}
        onChange={searchHandler}
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
