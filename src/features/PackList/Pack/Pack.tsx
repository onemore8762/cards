import React from 'react'

import { Grid } from '@mui/material'
import Button from '@mui/material/Button'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/path/path'
import { selectUserId } from '../../Profile/profileSelectors'
import style from '../PackList.module.css'
import { PackTable } from '../Table/PackTable'

export const Pack = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUserId)
  const createdId = useAppSelector(state => state.pack.userId)

  return (
    <Grid container justifyContent={'center'} style={{ position: 'relative' }}>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <div className={style.packList}>
        <div className={style.header_row}>
          <PageTitle title={userId === createdId ? 'My Pack' : "Friend's Pack"} />
          <div className={style.addNewPackBtn}>
            <Button
              // disabled={isLoading}
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              sx={{
                width: '175px',
                borderRadius: '30px',
              }}
              //onClick={addNewPack}
            >
              Learn to pack
            </Button>
          </div>
        </div>

        <PackTable />
      </div>
    </Grid>
  )
}
