import React, { useState } from 'react'

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { Button, LinearProgress, SvgIcon } from '@mui/material'
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
import { Link, useNavigate } from 'react-router-dom'

import icon from '../../../assets/icons/newspaper.svg'
import avatar from '../../../assets/images/avatar.jpg'
import { logoutTC } from '../../../features/Login/login-reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { PATH } from '../../path/path'

import s from './NavBar.module.css'

export const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const userName = useAppSelector(state => state.profile.name)
  const status = useAppSelector(state => state.app.status)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [settings, setSettings] = useState([
    {
      icon: PersonOutlineOutlinedIcon,
      title: 'Profile',
      func: () => {
        navigate(PATH.PROFILE.PROFILE)
        setAnchorElUser(null)
      },
    },
    {
      icon: LogoutOutlinedIcon,
      title: 'Logout',
      func: () => {
        dispatch(logoutTC())
        navigate(PATH.LOGIN.LOGIN)
        setAnchorElUser(null)
      },
    },
  ])

  const loginHandler = () => {
    navigate(PATH.LOGIN.LOGIN)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <div className={s.appBar}>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 120px' }}
          >
            {/*Логотип*/}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className={s.navbarLogo}>
                <div className={s.navbarLogo_icon}>
                  <img src={icon} alt="logo" />
                </div>
                <div className={s.navbarLogo_title}>CARDS</div>
              </div>
            </Link>

            {isLoggedIn ? (
              <div className={s.navbarUser}>
                {/*Имя пользователя*/}
                <div className={s.navbarUsername}>{userName}</div>

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
                        <SvgIcon component={setting.icon} sx={{ mr: 1 }} />
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
      {status === 'loading' && <LinearProgress />}
    </div>
  )
}
