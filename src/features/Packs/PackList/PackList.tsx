import React, { ChangeEvent, useEffect } from 'react'

import FilterAltOffTwoToneIcon from '@mui/icons-material/FilterAltOffTwoTone'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { FilterShow } from '../../../common/components/FilterShow/FilterShow'
import { PackBasicModal } from '../../../common/components/Modals/PackBasicModal/PackBasicModal'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../../common/components/Pagination/PaginationBlock'
import { RangeSlider } from '../../../common/components/RangeSlider/RangeSlider'
import { SearchInput } from '../../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../common/hooks/useDebounce'
import { Card_ButtonStyle } from '../../../common/styles/CardStyles'
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

  // search
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

  // filter
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

  // pack functions
  const addNewPackHandler = (
    inputValue: string,
    packCoverState: string,
    privateCheckbox: boolean
  ) => {
    dispatch(
      addPacksTC({
        cardsPack: { name: inputValue, deckCover: packCoverState, private: privateCheckbox },
      })
    )
  }

  // pagination
  const changePaginationHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUpdatePackAC({ pageCount: +event.target.value, page: 1 }))
    searchParams.set('pageCount', event.target.value)
  }
  const changePageHandler = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setUpdatePackAC({ page: value }))
    searchParams.set('page', `${value}`)
  }

  // render
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

  if (!initialize) return <PackListSkeleton />

  return (
    <div className={s.packList}>
      <div className={s.header_row}>
        <PageTitle title={'Packs List'} />
        <div className={s.addNewPackBtn}>
          <div>
            <PackBasicModal headerTitle={'Add New Pack'} saveItem={addNewPackHandler}>
              <Button
                disabled={isLoading}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={Card_ButtonStyle}
              >
                Add New Pack
              </Button>
            </PackBasicModal>
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
            <FilterAltOffTwoToneIcon fontSize="medium" />
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
        handleChangePage={changePageHandler}
        handleChangePagination={changePaginationHandler}
      />
    </div>
  )
}
