import React, { useCallback, useEffect } from 'react'

import AddAPhoto from '@mui/icons-material/AddAPhoto'
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined'
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import { Navigate, useNavigate } from 'react-router-dom'

import avatar from '../../assets/images/avatar.jpg'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { logoutTC } from '../Login/login-reducer'

import { updateUserDataTC } from './profile-reducer'
import style from './Profile.module.css'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const userName = useAppSelector(state => state.profile.name)
  const userEmail = useAppSelector(state => state.profile.email)

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

  if (!isLoggedIn) {
    navigate('/login')
    // можно и так
    // return <Navigate to={'/login'} />
  }

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
              <EditableSpan
                title={userName ? userName : ''}
                onChangeInput={changeTaskTitleHandler}
              />
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
