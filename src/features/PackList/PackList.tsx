import React, { ChangeEvent, useEffect } from 'react'

import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { FilterShow } from '../../common/components/FilterShow/FilterShow'
import { PageTitle } from '../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../common/components/Pagination/PaginationBlock'
import { RangeSlider } from '../../common/components/RangeSlider/RangeSlider'
import { SearchInput } from '../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { useDebounce } from '../../common/hooks/useDebounce'

import { addPacksTC, getPacksTC, setUpdatePack } from './packList-reducer'
import style from './PackList.module.css'
import {
  selectPackListCardPacksTotalCount,
  selectPackListInitialize,
  selectPackListIsLoading,
  selectPackListIsMy,
  selectPackListMax,
  selectPackListMin,
  selectPackListPage,
  selectPackListPageCount,
  selectPackListSearchPack,
  selectPackListSortPacks,
} from './packListSelectors'
import { PackListSkeleton } from './PackListSkeleton'
import { BasicTable } from './Table/BasicTable'

export const PackList = () => {
  const dispatch = useAppDispatch()
  const initialize = useAppSelector(selectPackListInitialize)
  const isLoading = useAppSelector(selectPackListIsLoading)
  const searchPackName = useAppSelector(selectPackListSearchPack)
  const debouncedSearchPack = useDebounce<string>(searchPackName, 1000)
  const pageCount = useAppSelector(selectPackListPageCount)
  const page = useAppSelector(selectPackListPage)
  const maxPage = useAppSelector(selectPackListCardPacksTotalCount)
  const isMy = useAppSelector(selectPackListIsMy)
  const sort = useAppSelector(selectPackListSortPacks)
  const min = useAppSelector(selectPackListMin)
  const max = useAppSelector(selectPackListMax)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (initialize) {
      dispatch(getPacksTC())
    }
    setSearchParams(searchParams)
  }, [debouncedSearchPack, page, pageCount, sort, min, max, isMy])

  useEffect(() => {
    if (!initialize) {
      let isMyQuery = Boolean(searchParams.get('my') === 'true')
      let minQuery = Number(searchParams.get('min') || -1)
      let maxQuery = Number(searchParams.get('max') || -1)
      let pageCountQuery = Number(searchParams.get('pageCount') || 4)
      let pageQuery = Number(searchParams.get('page') || 1)
      let questionQuery = searchParams.get('packName') || ''
      let sortPackQuery = (searchParams.get('sortPack') as '0updated' | '1updated') || '1update'

      dispatch(
        setUpdatePack({
          isMy: isMyQuery,
          min: minQuery !== -1 ? minQuery : null,
          max: maxQuery !== -1 ? maxQuery : null,
          page: pageQuery,
          pageCount: pageCountQuery,
          packName: questionQuery,
          sortPacks: sortPackQuery,
        })
      )
      dispatch(getPacksTC())
    }
  }, [])

  const filterDefault = () => {
    setSearchParams('')
    dispatch(
      setUpdatePack({
        min: null,
        max: null,
        isMy: false,
        packName: '',
        page: 1,
        pageCount: 4,
        sortPacks: '0updated',
      })
    )
  }

  if (!initialize) return <PackListSkeleton />

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUpdatePack({ packName: e.currentTarget.value }))
    searchParams.set('packName', e.currentTarget.value)
  }

  const handleChangePagination = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUpdatePack({ pageCount: +event.target.value, page: 1 }))
    searchParams.set('pageCount', event.target.value)
  }

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setUpdatePack({ page: value }))
    searchParams.set('page', `${value}`)
  }

  const addNewPack = () => {
    dispatch(
      addPacksTC({ cardsPack: { name: 'no Name', deckCover: 'url or base64', private: false } })
    )
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
              search={searchPackName}
              searchHandler={searchHandler}
              placeholder={'find pack'}
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
      <PaginationBlock
        disabled={isLoading}
        page={page}
        maxPage={maxPage}
        pageCount={pageCount}
        handleChangePage={handleChangePage}
        handleChangePagination={handleChangePagination}
      />
    </div>
  )
}
