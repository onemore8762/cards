import React from 'react'

import { Skeleton } from '@mui/material'

import { PageTitle } from '../../../common/components/PageTitle/PageTitle'

import s from './PackList.module.css'

export const PackListSkeleton = () => {
  return (
    <div className={s.packList}>
      <div className={s.header_row}>
        <PageTitle title={'Packs List'} />
        <div className={s.addNewPackBtn}>
          <Skeleton
            animation="wave"
            sx={{ width: '175px', margin: '0', height: '35px', borderRadius: '30px' }}
          ></Skeleton>
        </div>
      </div>
      <div className={s.search_row}>
        <div>
          <div className={s.column_title}>Search</div>
          <div>
            <Skeleton
              animation="wave"
              sx={{ width: '308px', margin: '0', height: '40px' }}
            ></Skeleton>
          </div>
        </div>
        <div>
          <div className={s.column_title}>Show Packs Card</div>
          <div>
            <Skeleton
              animation="wave"
              sx={{ width: '200px', margin: '0', height: '40px' }}
            ></Skeleton>
          </div>
        </div>
        <div>
          <div className={s.column_title}>Number of Cards</div>
          <div className={s.rangeSlider}>
            <Skeleton
              animation="wave"
              sx={{ width: '250px', margin: '0', height: '40px' }}
            ></Skeleton>
          </div>
        </div>
        <div className={s.filter_icon} style={{ border: 'none' }}>
          <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '40px' }}></Skeleton>
        </div>
      </div>
      <div className={s.mainTable}>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
        <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '80px' }}></Skeleton>
      </div>
      <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '40px' }}></Skeleton>
    </div>
  )
}
