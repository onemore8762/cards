import React, { useCallback } from 'react'

// import Box from '@mui/material/Box'
import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined'
import Button from '@mui/material/Button'
// import Button from '@mui/material-next/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'

import style from './Profile.module.css'

// const bull = (
//   <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
//     •
//   </Box>
// )

export const Profile = () => {
  const changeTaskTitleHandler = useCallback(
    (/*newInputValue: string*/) => {
      //dispatch(updateTaskTC(props.todolistId, props.task.id, { title: newInputValue }))
    },
    [
      /*props.todolistId, props.task.id*/
    ]
  )

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: 413, height: 360 }}>
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '90%',
              justifyContent: 'space-evenly',
            }}
          >
            <Typography style={{ fontSize: '22px' }} component="div">
              Personal Information
            </Typography>
            <div className={style.avatar}>
              <img
                src="https://ucarecdn.com/7f8adb46-03da-4508-8b63-bc1c2cf949b8/-/sharp/3/-/format/jpeg/-/progressive/yes/-/quality/normal/-/scale_crop/622x622/center/"
                alt="avatar"
              />
            </div>
            {/*<Typography style={{ fontSize: '20px' }} component="div">*/}
            {/*  Name*/}
            {/*  <BorderColorOutlined sx={{ paddingLeft: '10px' }} fontSize={'small'} />*/}
            {/*</Typography>*/}

            <div style={{ height: '40px' }}>
              <EditableSpan title={'Name'} onChangeInput={changeTaskTitleHandler} />
              {/*<BorderColorOutlined sx={{ paddingLeft: '10px' }} fontSize={'small'} />*/}
            </div>

            <Typography style={{ fontSize: '14px', opacity: '0.5' }} component="div">
              myEmail.@gmail.com
            </Typography>
            <Button
              startIcon={<ExitToAppOutlined sx={{ color: 'black' }} />}
              type={'submit'}
              variant={'contained'}
              color={'error'}
              sx={{
                width: '127px',
                borderRadius: '30px',
                color: 'black',
                backgroundColor: 'white',
              }}
            >
              Log Out
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
