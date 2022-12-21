import React, { ChangeEvent } from 'react'

import { NativeSelect } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import style from './PaginationBlock.module.css'

type Props = {
  disabled: boolean
  pageCount: number
  page: number
  maxPage: number
  handleChangePagination?: (event: ChangeEvent<HTMLSelectElement>) => void
  handleChangePage?: (event: ChangeEvent<unknown>, value: number) => void
}

export const PaginationBlock: React.FC<Props> = ({
  disabled,
  page,
  pageCount,
  maxPage,
  handleChangePage,
  handleChangePagination,
}) => {
  return (
    <div className={style.pagination_block}>
      <div className={style.pagination}>
        <Stack spacing={2}>
          <Pagination
            disabled={disabled}
            count={Math.ceil(maxPage / pageCount) || 0}
            shape="rounded"
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
      </div>
      <div className={style.pagination_show}>
        <div className={style.pagination_show_title}>Show</div>
        <div className={style.pagination_show_select}>
          <NativeSelect
            disabled={disabled}
            onChange={handleChangePagination}
            defaultValue={4}
            inputProps={{
              id: 'uncontrolled-native',
            }}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
          </NativeSelect>
        </div>
        <div className={style.pagination_show_text}>cards per page</div>
      </div>
    </div>
  )
}
