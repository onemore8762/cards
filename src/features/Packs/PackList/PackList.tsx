import React, { ChangeEvent, useEffect, useState } from 'react'

import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { FilterShow } from '../../../common/components/FilterShow/FilterShow'
import { AddNewCardModal } from '../../../common/components/Modals/AddNewCardModal/AddNewCardModal'
import { AddNewPackModal } from '../../../common/components/Modals/AddNewPackModal/AddNewPackModal'
import { BasicModal } from '../../../common/components/Modals/BasicModal/BasicModal'
import { DeleteCardModal } from '../../../common/components/Modals/DeleteCardModal/DeleteCardModal'
import { DeletePackModal } from '../../../common/components/Modals/DeletePackModal/DeletePackModal'
import { EditCardModal } from '../../../common/components/Modals/EditCardModal/EditCardModal'
import { EditPackModal } from '../../../common/components/Modals/EditPackModal/EditPackModal'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../../common/components/Pagination/PaginationBlock'
import { RangeSlider } from '../../../common/components/RangeSlider/RangeSlider'
import { SearchInput } from '../../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../common/hooks/useDebounce'
import { PackListTable } from '../Table/PackListTable'

import { addPacksTC, getPacksTC, setUpdatePackAC } from './packList-reducer'
import s from './PackList.module.css'
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

export const PackList = () => {
  const dispatch = useAppDispatch()
  const initialize = useAppSelector(selectPackListInitialize)
  const isLoading = useAppSelector(selectPackListIsLoading)
  const searchPackName = useAppSelector(selectPackListSearchPack)
  const pageCount = useAppSelector(selectPackListPageCount)
  const page = useAppSelector(selectPackListPage)
  const maxPage = useAppSelector(selectPackListCardPacksTotalCount)
  const isMy = useAppSelector(selectPackListIsMy)
  const sort = useAppSelector(selectPackListSortPacks)
  const min = useAppSelector(selectPackListMin)
  const max = useAppSelector(selectPackListMax)

  const debouncedSearchPack = useDebounce<string>(searchPackName, 500)
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
      let sortPackQuery = (searchParams.get('sortPack') as '0updated' | '1updated') || '0updated'

      dispatch(
        setUpdatePackAC({
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
    searchParams.delete('isMy')
    searchParams.delete('min')
    searchParams.delete('max')
    searchParams.delete('page')
    searchParams.delete('pageCount')
    setSearchParams(searchParams)
    dispatch(
      setUpdatePackAC({
        min: null,
        max: null,
        isMy: false,
        page: 1,
        pageCount: 4,
        sortPacks: '0updated',
      })
    )
  }

  if (!initialize) return <PackListSkeleton />

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUpdatePackAC({ packName: e.currentTarget.value, isLoading: true }))
    if (e.currentTarget.value !== '') {
      searchParams.set('packName', e.currentTarget.value)
    } else {
      searchParams.delete('packName')
    }
  }

  const clearSearchInputValueHandler = () => {
    dispatch(setUpdatePackAC({ packName: '' }))
    searchParams.delete('packName')
  }

  const handleChangePagination = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUpdatePackAC({ pageCount: +event.target.value, page: 1 }))
    searchParams.set('pageCount', event.target.value)
  }

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setUpdatePackAC({ page: value }))
    searchParams.set('page', `${value}`)
  }

  const addNewPack = () => {
    dispatch(
      addPacksTC({ cardsPack: { name: 'no Name', deckCover: 'url or base64', private: false } })
    )
  }

  return (
    <div className={s.packList}>
      <div className={s.header_row}>
        <PageTitle title={'Packs List'} />
        <div className={s.addNewPackBtn}>
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
          <div>
            <AddNewPackModal />
          </div>
          <div>
            <EditPackModal />
          </div>
          <div>
            <AddNewCardModal />
          </div>
          <div>
            <EditCardModal />
          </div>
          <div>
            <DeletePackModal />
          </div>
          <div>
            <DeleteCardModal />
          </div>
        </div>
      </div>
      <div className={s.search_row}>
        <div>
          <div className={s.column_title}>Search</div>
          <div>
            <SearchInput
              search={searchPackName}
              searchHandler={searchHandler}
              placeholder={'find pack'}
              sx={{ width: '415px' }}
              clearInputValue={clearSearchInputValueHandler}
            />
          </div>
        </div>
        <div>
          <div className={s.column_title}>Show Packs Card</div>
          <div>
            <FilterShow disabled={isLoading} />
          </div>
        </div>
        <div>
          <div className={s.column_title}>Number of Cards</div>
          <div className={s.rangeSlider}>
            <RangeSlider disabled={isLoading} />
          </div>
        </div>
        <div className={s.filter_icon}>
          <IconButton sx={{ borderRadius: '0' }} onClick={filterDefault} disabled={isLoading}>
            <FilterAltOutlined fontSize="medium" />
          </IconButton>
        </div>
      </div>
      <div className={s.mainTable}>
        <PackListTable />
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