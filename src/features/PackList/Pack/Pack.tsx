import React, { ChangeEvent, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Grid, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { SearchInput } from '../../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/path/path'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { setSearchTitleAC } from '../packList-reducer'
import style from '../PackList.module.css'
import { selectIsLoading, selectSearchPack } from '../packListSelectors'
import { PackTable } from '../Table/PackTable'

import s from './Pack.module.css'
import { selectPackUserId } from './packSelectors'

export const Pack = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectProfileUserId)
  const createdId = useAppSelector(selectPackUserId)
  const isLoading = useAppSelector(selectIsLoading)
  const search = useAppSelector(selectSearchPack)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTitleAC(e.currentTarget.value))
  }

  return (
    <Grid container justifyContent={'center'} style={{ position: 'relative' }}>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <div className={style.packList}>
        <div className={style.header_row}>
          {userId === createdId ? (
            <Grid display="flex" alignItems="center">
              <PageTitle title="My Pack" />
              <IconButton onClick={handleOpenUserMenu}>
                <MoreVertIcon
                  sx={{ border: '1px solid black', borderRadius: '50px', color: 'black' }}
                />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography textAlign="center">text</Typography>
                  <MoreVertIcon />
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">text</Typography>
                  <MoreVertIcon />
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">text</Typography>
                  <MoreVertIcon />
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <PageTitle title="Friend's Pack" />
          )}

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
            >
              Learn to pack
            </Button>
          </div>
        </div>
        <div className={s.searchRow}>
          <div className={style.column_title}>Search</div>
          <div>
            <SearchInput
              disabled={isLoading}
              search={search}
              searchHandler={searchHandler}
              sx={{ width: '100%' }}
            />
          </div>
        </div>
        <PackTable />
      </div>
    </Grid>
  )
}
