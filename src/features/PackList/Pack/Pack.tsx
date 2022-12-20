import React, { ChangeEvent, useState } from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
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

import { addCardTC } from './pack-reducer'
import s from './Pack.module.css'
import { selectCardsList, selectPackUserId } from './packSelectors'

export const Pack = () => {
  const dispatch = useAppDispatch()
  //const cardsList = useAppSelector(selectCardsList)
  const cardsList = useAppSelector(state => state.pack.cardList)
  const userId = useAppSelector(selectProfileUserId)
  const packId = useAppSelector(state => state.pack.packId)
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
  const handlerAddCard = () => {
    dispatch(addCardTC({ cardsPack_id: packId }))
  }

  return (
    <Grid container justifyContent={'center'} /*style={{ position: 'relative' }}*/>
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
                  <BorderColorOutlined sx={{ mr: 1 }} />
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem>
                  <DeleteOutlineIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
                <MenuItem>
                  <SchoolOutlinedIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Learn</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <PageTitle title="Friend's Pack" />
          )}

          <div className={style.addNewPackBtn}>
            {userId === createdId ? (
              <Button
                // disabled={isLoading}
                onClick={handlerAddCard}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{
                  width: '175px',
                  borderRadius: '30px',
                }}
              >
                Add new card
              </Button>
            ) : (
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
            )}
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
        <PackTable cardsList={cardsList} />
      </div>
    </Grid>
  )
}
