import React, { useCallback, useEffect } from 'react'

import AddAPhoto from '@mui/icons-material/AddAPhoto'
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined'
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import { CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'

import { initializeAppTC } from '../../app/app-reducer'
import avatar from '../../assets/images/avatar.jpg'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { setAuthUserDataTC, updateUserDataTC } from '../Auth/auth-reducer'
import { logoutTC } from '../Login/login-reducer'

import style from './Profile.module.css'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  const userName = useAppSelector<string>(state => state.authMe.name)
  const userEmail = useAppSelector<string | null>(state => state.authMe.email)

  const changeTaskTitleHandler = useCallback((newInputValue: string) => {
    dispatch(updateUserDataTC(newInputValue))
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
    navigate('/login')
  }, [])

  const loadPhotoHandler = () => {
    alert('load photo')
    // dispatch(loadPhotoAC())
  }
  const backHandler = () => {
    alert('back')
  }

  // инициализация приложения
  // useEffect(() => {
  //   dispatch(initializeAppTC())
  // }, [])

  // редирект на логин, если не залогинились
  useEffect(() => {
    !isLoggedIn && navigate('/login')
  }, [isLoggedIn])

  // чтобы данные в профайле были всегда в актуальном состоянии
  useEffect(() => {
    dispatch(setAuthUserDataTC())
  }, [])

  // лоадер, если приложение не инициализировано
  // if (!isInitialized) {
  //   return (
  //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
  //       <CircularProgress />
  //     </div>
  //   )
  // }

  return (
    <Grid container justifyContent={'center'} style={{ position: 'relative' }}>
      <div className={style.backButton} onClick={backHandler}>
        <KeyboardBackspace />
        <div className={style.backButton_title}>Back to Packs List</div>
      </div>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card className={style.cardMain}>
          <CardContent className={style.cardContent}>
            <div className={style.cardTitle}>Personal Information</div>

            <div className={style.avatar}>
              <div className={style.avatarImage}>
                <img src={avatar} alt="avatar" />
              </div>
              <div className={style.loadAvatar} onClick={loadPhotoHandler}>
                <AddAPhoto className={style.loadAvatar_icon} />
              </div>
            </div>

            <div className={style.userName}>
              <EditableSpan title={userName} onChangeInput={changeTaskTitleHandler} />
            </div>

            <div className={style.userEmail}>{userEmail}</div>
            <div className={style.logoutButton}>
              <Button
                startIcon={<ExitToAppOutlined sx={{ color: 'black' }} />}
                type={'submit'}
                variant={'contained'}
                color={'error'}
                // className={style.logoutButton}
                sx={{
                  width: '127px',
                  borderRadius: '30px',
                  color: 'black',
                  backgroundColor: 'white',
                }}
                onClick={logoutHandler}
              >
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
