import React, { useState } from 'react'

import AdbIcon from '@mui/icons-material/Adb'
// import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
// import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
// import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'

import icon from '../../../assets/icons/newspaper.svg'
import avatar from '../../../assets/images/avatar.jpg'

import style from './NavBar.module.css'

// const settings = ['Profile', 'Logout']

export const NavBar = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState<boolean>(true)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [settings, setSettings] = useState([
    {
      title: 'Profile',
      func: () => {
        navigate('/profile')
        setAnchorElUser(null)
      },
    },
    {
      title: 'Logout',
      func: () => {
        // dispatch(logoutTC())
        alert('logout')
        setAnchorElUser(null)
      },
    },
  ])

  const loginHandler = () => {
    alert('login')
    // dispatch(loginTC())
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 100px' }}
        >
          {/*Логотип*/}
          <div className={style.navbarLogo}>
            {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
            <div className={style.navbarLogo_icon}>
              <img src={icon} alt="logo" />
            </div>
            <Typography
              className={style.navbarLogo_title}
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CARDS
            </Typography>
          </div>

          {login ? (
            <div className={style.navbarUser}>
              {/*Имя пользователя*/}
              <div className={style.navbarUsername}>UserName</div>

              {/*Аватарка с меню*/}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src={avatar}
                      // src="https://ucarecdn.com/7f8adb46-03da-4508-8b63-bc1c2cf949b8/-/sharp/3/-/format/jpeg/-/progressive/yes/-/quality/normal/-/scale_crop/622x622/center/"
                    />
                  </IconButton>
                </Tooltip>
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
                  {settings.map(setting => (
                    <MenuItem
                      key={setting.title}
                      /*onClick={handleCloseUserMenu}*/ onClick={setting.func}
                    >
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          ) : (
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              sx={{ borderRadius: '30px' }}
              onClick={loginHandler}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
