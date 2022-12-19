import React, { ChangeEvent } from 'react'

import { NativeSelect } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { getPacksTC, setPageAC, setPageCountAC } from '../../../features/PackList/packList-reducer'
import {
  selectCardPacksTotalCount,
  selectPage,
  selectPageCount,
} from '../../../features/PackList/packListSelectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import style from './PaginationBlock.module.css'

type Props = {
  disabled: boolean
}

export const PaginationBlock: React.FC<Props> = ({ disabled }) => {
  const dispatch = useAppDispatch()
  const pageCount = useAppSelector(selectPageCount)
  const page = useAppSelector(selectPage)
  const maxPage = useAppSelector(selectCardPacksTotalCount)

  const handleChangePagination = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPageCountAC(+event.target.value))
    dispatch(getPacksTC())
  }

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setPageAC(value))
    dispatch(getPacksTC())
  }

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
