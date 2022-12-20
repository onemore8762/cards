import React, { useCallback } from 'react'

import AddAPhoto from '@mui/icons-material/AddAPhoto'
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'

import avatar from '../../assets/images/avatar.jpg'
import { BackToPacksListButton } from '../../common/components/BackToPacksListButton/BackToPacksListButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { PATH } from '../../common/path/path'
import { logoutTC } from '../Login/login-reducer'
import { selectUserEmail, selectUserName } from '../Login/profileSelectors'

import { updateUserDataTC } from './profile-reducer'
import style from './Profile.module.css'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectUserName)
  const userEmail = useAppSelector(selectUserEmail)

  const changeTaskTitleHandler = useCallback((newInputValue: string) => {
    dispatch(updateUserDataTC(newInputValue))
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
    navigate(PATH.LOGIN.LOGIN)
  }, [])

  const loadPhotoHandler = () => {
    alert('load photo')
    // dispatch(loadPhotoAC())
  }

  // если нет PrivateRoutes
  // if (!isLoggedIn) {
  //   return <Navigate to={PATH.LOGIN.LOGIN} />
  // }

  return (
    <Grid display="flex" flexDirection={'column'} container style={{ position: 'relative' }}>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
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
