import React, { ChangeEvent, useCallback, useState } from 'react'

import AddAPhoto from '@mui/icons-material/AddAPhoto'
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'

import DefaultUserAvatar from '../../assets/images/DefaultProfileAvatar.jpg'
import { BackToPacksListButton } from '../../common/components/BackToPacksListButton/BackToPacksListButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { PATH } from '../../common/path/path'
import { uploadHandler } from '../../common/utils/uploadFile'
import { logoutTC } from '../Login/login-reducer'

import { updateUserDataTC, updateUserPhotoTC } from './profile-reducer'
import s from './Profile.module.css'
import { selectUserAvatar, selectUserEmail, selectUserName } from './profileSelectors'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectUserName)
  const userEmail = useAppSelector(selectUserEmail)
  const userAvatar = useAppSelector(selectUserAvatar)

  const [userAvatarState, setUserAvatarState] = useState(DefaultUserAvatar)

  // styles
  const Profile_ButtonStyle = {
    width: '127px',
    borderRadius: '30px',
    color: 'black',
    backgroundColor: 'white',
  }

  // functions
  const changeUserNameHandler = useCallback((newInputValue: string) => {
    dispatch(updateUserDataTC(newInputValue))
  }, [])

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
    navigate(PATH.LOGIN.LOGIN)
  }, [])

  const loadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    uploadHandler(event, setUserAvatarState, file64 => {
      dispatch(updateUserPhotoTC(file64))
    })
  }

  // если нет PrivateRoutes
  // if (!isLoggedIn) {
  //   return <Navigate to={PATH.LOGIN.LOGIN} />
  // }

  return (
    <Grid container display="flex" flexDirection={'column'}>
      <div className={s.backBtnBlock}>
        <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      </div>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card className={s.cardMain}>
          <CardContent className={s.cardContent}>
            <div className={s.cardTitle}>Personal Information</div>

            <div className={s.avatar}>
              <div className={s.avatarImage}>
                <img src={userAvatar !== null ? userAvatar : userAvatarState} alt="avatar" />
              </div>
              <div className={s.loadAvatar}>
                <label>
                  <input type="file" style={{ display: 'none' }} onChange={loadPhotoHandler} />
                  <IconButton component="span">
                    <AddAPhoto className={s.loadAvatar_icon} />
                  </IconButton>
                </label>
              </div>
            </div>

            <div className={s.userName}>
              <EditableSpan
                title={userName ? userName : ''}
                onChangeInput={changeUserNameHandler}
              />
            </div>

            <div className={s.userEmail}>{userEmail}</div>
            <div className={s.logoutButton}>
              <Button
                startIcon={<ExitToAppOutlined sx={{ color: 'black' }} />}
                type={'submit'}
                variant={'contained'}
                color={'error'}
                sx={Profile_ButtonStyle}
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
