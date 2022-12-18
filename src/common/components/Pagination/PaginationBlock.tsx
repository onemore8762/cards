import React from 'react'

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'

import style from './PaginationBlock.module.css'

export const PaginationBlock = () => {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <div className={style.pagination_block}>
      <div className={style.pagination}>
        <Stack spacing={2}>
          <Pagination count={10} shape="rounded" />
        </Stack>
      </div>
      <div className={style.pagination_show}>
        <div className={style.pagination_show_title}>Show</div>
        <div className={style.pagination_show_select}>
          <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>5</em>
              </MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={style.pagination_show_text}>cards per page</div>
      </div>
    </div>
  )
}
