import React from 'react'

import Button from '@mui/material/Button'

import { PageTitle } from '../../common/components/PageTitle/PageTitle'

import style from './PackList.module.css'
import { BasicTable } from './Table/BasicTable'

export const PackList = () => {
  const headerInTable = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

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
      <div className={style.mainTable}>
        <BasicTable headerInTable={headerInTable} />
      </div>
    </div>
  )
}
