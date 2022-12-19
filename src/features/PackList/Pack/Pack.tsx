import React from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Grid, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/path/path'
import { selectUserId } from '../../Profile/profileSelectors'
import style from '../PackList.module.css'
import { PackTable } from '../Table/PackTable'

export const Pack = () => {
  const userId = useAppSelector(selectUserId)
  const createdId = useAppSelector(state => state.pack.userId)

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
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

        <PackTable />
      </div>
    </Grid>
  )
}
