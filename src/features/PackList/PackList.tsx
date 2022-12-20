import React, { ChangeEvent, useEffect } from 'react'

import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'

import { FilterShow } from '../../common/components/FilterShow/FilterShow'
import { PageTitle } from '../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../common/components/Pagination/PaginationBlock'
import { RangeSlider } from '../../common/components/RangeSlider/RangeSlider'
import { SearchInput } from '../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { useDebounce } from '../../common/hooks/useDebounce'

import {
  addPacksTC,
  getPacksTC,
  initializePacksTC,
  setIsMyAC,
  setMaxMinAC,
  setSearchTitleAC,
} from './packList-reducer'
import style from './PackList.module.css'
import { selectInitialize, selectIsLoading, selectSearchPack } from './packListSelectors'
import { PackListSkeleton } from './PackListSkeleton'
import { BasicTable } from './Table/BasicTable'

export const PackList = () => {
  const dispatch = useAppDispatch()
  const initialize = useAppSelector(selectInitialize)
  const isLoading = useAppSelector(selectIsLoading)
  const search = useAppSelector(selectSearchPack)
  const debouncedSearch = useDebounce<string>(search, 1000)

  const addNewPack = () => {
    dispatch(
      addPacksTC({ cardsPack: { name: 'no Name', deckCover: 'url or base64', private: false } })
    )
  }

  useEffect(() => {
    if (search) {
      dispatch(getPacksTC())
    }
  }, [debouncedSearch])

  const filterDefault = () => {
    dispatch(setMaxMinAC(0, 110))
    dispatch(setIsMyAC(false))
    dispatch(setSearchTitleAC(''))
    dispatch(getPacksTC())
  }

  useEffect(() => {
    dispatch(initializePacksTC())
  }, [])

  if (initialize) return <PackListSkeleton />

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTitleAC(e.currentTarget.value))
  }

  return (
    <div className={style.packList}>
      <div className={style.header_row}>
        <PageTitle title={'Packs List'} />
        <div className={style.addNewPackBtn}>
          <Button
            disabled={isLoading}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            sx={{
              width: '175px',
              borderRadius: '30px',
            }}
            onClick={addNewPack}
          >
            Add New Pack
          </Button>
        </div>
      </div>
      <div className={style.search_row}>
        <div>
          <div className={style.column_title}>Search</div>
          <div>
            <SearchInput
              disabled={isLoading}
              search={search}
              searchHandler={searchHandler}
              sx={{ width: '415px' }}
            />
          </div>
        </div>
        <div>
          <div className={style.column_title}>Show Packs Card</div>
          <div>
            <FilterShow disabled={isLoading} />
          </div>
        </div>
        <div>
          <div className={style.column_title}>Number of Cards</div>
          <div className={style.rangeSlider}>
            <RangeSlider disabled={isLoading} />
          </div>
        </div>
        <div className={style.filter_icon}>
          <IconButton sx={{ borderRadius: '0' }} onClick={filterDefault} disabled={isLoading}>
            <FilterAltOutlined fontSize="medium" />
          </IconButton>
        </div>
      </div>
      <div className={style.mainTable}>
        <BasicTable />
      </div>
      <PaginationBlock disabled={isLoading} />
    </div>
  )
}
