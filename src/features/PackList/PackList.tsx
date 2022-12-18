import React from 'react'

import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'
import { Paper } from '@mui/material'
import Button from '@mui/material/Button'

import { FilterShow } from '../../common/components/FilterShow/FilterShow'
import { PageTitle } from '../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../common/components/Pagination/PaginationBlock'
import { RangeSlider } from '../../common/components/RangeSlider/RangeSlider'
import { SearchInput } from '../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'

import { addPacksTC } from './packList-reducer'
import style from './PackList.module.css'
import { BasicTable } from './Table/BasicTable'

export const PackList = () => {
  const dispatch = useAppDispatch()

  const addNewPack = () => {
    //alert('add new pack')
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
            <SearchInput />
          </div>
        </div>
        <div>
          <div className={style.column_title}>Show Packs Card</div>
          <div>
            <FilterShow />
          </div>
        </div>
        <div>
          <div className={style.column_title}>Number of Cards</div>
          <div className={style.rangeSlider}>
            <RangeSlider />
          </div>
        </div>
        <div className={style.filter_icon}>
          <FilterAltOutlined fontSize="medium" />
        </div>
      </div>
      <div className={style.mainTable}>
        <BasicTable />
      </div>
      <PaginationBlock />
    </div>
  )
}
