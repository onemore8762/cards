import React, { ChangeEvent, useCallback, useState } from 'react'

import AddAPhoto from '@mui/icons-material/AddAPhoto'
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'

import DefaultUserAvatar from '../../assets/images/avatar.jpg'
import { BackToPacksListButton } from '../../common/components/BackToPacksListButton/BackToPacksListButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import { PATH } from '../../common/path/path'
import { logoutTC } from '../Login/login-reducer'

import { updateUserDataTC } from './profile-reducer'
import s from './Profile.module.css'
import { selectUserAvatar, selectUserEmail, selectUserName } from './profileSelectors'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const userName = useAppSelector(selectUserName)
  const userEmail = useAppSelector(selectUserEmail)
  const userAvatar = useAppSelector(selectUserAvatar)

  const [userAvatarState, SetUserAvatarState] = useState(userAvatar)

  const changeUserNameHandler = useCallback((newInputValue: string) => {
    dispatch(updateUserDataTC(newInputValue))
  }, [])

  // const changeUserAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files?.length) {
  //     props.updatePhoto(event.target.files[0]);
  //   }
  // }

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
    navigate(PATH.LOGIN.LOGIN)
  }, [])

  const loadPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      // console.log('file: ', file)

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          SetUserAvatarState(file64)
          // console.log('file64: ', file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }
  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  // если нет PrivateRoutes
  // if (!isLoggedIn) {
  //   return <Navigate to={PATH.LOGIN.LOGIN} />
  // }

  // @ts-ignore
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
                {/*<Avatar
                  src={userAvatar /*? userAvatar : DefaultProfileAvatar*!/
                  alt="User Avatar"
                />*/}
              </div>
              <div className={s.loadAvatar}>
                <label>
                  <input type="file" onChange={loadPhotoHandler} style={{ display: 'none' }} />
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
                // className={s.logoutButton}
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
