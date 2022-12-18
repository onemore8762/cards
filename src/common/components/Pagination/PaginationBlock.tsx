import React, { ChangeEvent } from 'react'

import { NativeSelect } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { getPacksTC, setPage, setPageCount } from '../../../features/PackList/packList-reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import style from './PaginationBlock.module.css'

export const PaginationBlock = () => {
  const dispatch = useAppDispatch()
  const pageCount = useAppSelector(state => state.packList.pageCount)
  const page = useAppSelector(state => state.packList.page)
  const maxPage = useAppSelector(state => state.packList.cardPacksTotalCount)

  const handleChangePagination = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPageCount(+event.target.value))
    dispatch(getPacksTC())
  }

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value))
    dispatch(getPacksTC())
  }

  return (
    <div className={style.pagination_block}>
      <div className={style.pagination}>
        <Stack spacing={2}>
          <Pagination
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
