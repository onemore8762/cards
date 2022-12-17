import React from 'react'

import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'

import { PageTitle } from '../../common/components/PageTitle/PageTitle'

import style from './PackList.module.css'
import { BasicTable } from './Table/BasicTable'

export const PackList = () => {
  const addNewPack = () => {
    alert('add new pack')
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
          <div>Input</div>
        </div>
        <div>
          <div className={style.column_title}>Show Packs Card</div>
          <div>My All</div>
        </div>
        <div>
          <div className={style.column_title}>Number of Cards</div>
          <div>2 10</div>
        </div>
        <div className={style.filter_icon}>
          <FilterAltOutlined fontSize="medium" />
        </div>
      </div>
      <div className={style.mainTable}>
        <BasicTable />
      </div>
    </div>
  )
}
