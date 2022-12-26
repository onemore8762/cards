import React, { useState } from 'react'

import { Button, Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { PATH } from '../../../common/path/path'

import { CardAnswer } from './CardAnswer'
import s from './CardQuestion.module.css'

export const CardQuestion = () => {
  const [isClickButton, setIsClickButton] = useState(false)

  return (
    <Grid container justifyContent={'center'}>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <Grid display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
        <Typography component="legend" variant="h5" sx={{ mt: 9, mb: 2 }}>
          Name Packs
        </Typography>
        <Card sx={{ width: 440, minHeight: 200 }}>
          <div className={s.cardQuestion_main}>
            <div className={s.cardQuestion_question}>
              <b>Question:</b> Question Will Be Here
            </div>
            <div className={s.cardQuestion_attempt}>Number of attempts for this question: 10</div>
            <div className={s.cardQuestion_button}>
              {!isClickButton && (
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={() => setIsClickButton(true)}
                  sx={{ borderRadius: '30px', mt: 3 }}
                  style={{ width: 335 }}
                >
                  Show Answer
                </Button>
              )}
              {isClickButton && <CardAnswer />}
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}
