import React from 'react'

import { Skeleton } from '@mui/material'

import { PageTitle } from '../../common/components/PageTitle/PageTitle'

import style from './PackList.module.css'

export const PackListSkeleton = () => {
  return (
    <div className={style.packList}>
      <div className={style.header_row}>
        <PageTitle title={'Packs List'} />
        <div className={style.addNewPackBtn}>
          <Skeleton
            animation="wave"
            sx={{ width: '175px', margin: '0', height: '35px', borderRadius: '30px' }}
          ></Skeleton>
        </div>
      </div>
      <div className={style.search_row}>
        <div>
          <div className={style.column_title}>Search</div>
          <div>
            <Skeleton
              animation="wave"
              sx={{ width: '308px', margin: '0', height: '40px' }}
            ></Skeleton>
          </div>
        </div>
        <div>
          <div className={style.column_title}>Show Packs Card</div>
          <div>
            <Skeleton
              animation="wave"
              sx={{ width: '200px', margin: '0', height: '40px', position: 'absolute' }}
            ></Skeleton>
          </div>
        </div>
        <div>
          <div className={style.column_title}>Number of Cards</div>
          <div className={style.rangeSlider}>
            <Skeleton
              animation="wave"
              sx={{ width: '250px', margin: '0', height: '40px' }}
            ></Skeleton>
          </div>
        </div>
        <div className={style.filter_icon} style={{ border: 'none' }}>
          <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '40px' }}></Skeleton>
        </div>
      </div>
      <div className={style.mainTable}>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
      </div>
      <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '40px' }}></Skeleton>
    </div>
  )
}
