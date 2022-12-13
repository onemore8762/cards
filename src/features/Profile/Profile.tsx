import React, { useCallback } from 'react'

// import Box from '@mui/material/Box'
import AddAPhoto from '@mui/icons-material/AddAPhoto'
// import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined'
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import Button from '@mui/material/Button'
// import Button from '@mui/material-next/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import avatar from '../../assets/images/avatar.jpg'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'

import style from './Profile.module.css'

// const bull = (
//   <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
//     •
//   </Box>
// )

export const Profile = () => {
  // const userName = useAppSelector<string>(state => state.profile.username)
  // const userEmail = useAppSelector<string>(state => state.profile.useremail)
  const changeTaskTitleHandler = useCallback(
    (/*newInputValue: string*/) => {
      //dispatch(updateTaskTC(props.todolistId, props.task.id, { title: newInputValue }))
    },
    [
      /*props.todolistId, props.task.id*/
    ]
  )
  const logoutHandler = () => {
    alert('you logged out')
    // dispatch(logoutTC())
  }
  const loadPhotoHandler = () => {
    alert('load photo')
    // dispatch(loadPhotoAC())
  }
  const backHandler = () => {
    alert('back')
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
                <img
                  // src="https://ucarecdn.com/7f8adb46-03da-4508-8b63-bc1c2cf949b8/-/sharp/3/-/format/jpeg/-/progressive/yes/-/quality/normal/-/scale_crop/622x622/center/"
                  src={avatar}
                  alt="avatar"
                />
              </div>
              <div className={style.loadAvatar} onClick={loadPhotoHandler}>
                <AddAPhoto className={style.loadAvatar_icon} />
              </div>
            </div>

            <div className={style.userName}>
              <EditableSpan title={'Name'} onChangeInput={changeTaskTitleHandler} />
            </div>

            <div className={style.userEmail}>myEmail@gmail.com</div>
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
