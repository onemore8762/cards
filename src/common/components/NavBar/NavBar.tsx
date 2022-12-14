import React, { useState } from 'react'

import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import icon from '../../../assets/icons/newspaper.svg'
import avatar from '../../../assets/images/avatar.jpg'
import { logoutTC } from '../../../features/Login/login-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks'

import style from './NavBar.module.css'

export const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  const userName = useAppSelector<string>(state => state.authMe.name)
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
        dispatch(logoutTC())
        navigate('/login')
        setAnchorElUser(null)
      },
    },
  ])

  const loginHandler = () => {
    navigate('/login')
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
          sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 120px' }}
        >
          {/*Логотип*/}
          <div className={style.navbarLogo}>
            <div className={style.navbarLogo_icon}>
              <a href="/">
                <img src={icon} alt="logo" />
              </a>
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
                marginLeft: '15px',
              }}
            >
              CARDS
            </Typography>
          </div>

          {isLoggedIn ? (
            <div className={style.navbarUser}>
              {/*Имя пользователя*/}
              <div className={style.navbarUsername}>{userName}</div>

              {/*Аватарка с меню*/}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={avatar} alt="User Avatar" />
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
                    <MenuItem key={setting.title} onClick={setting.func}>
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
