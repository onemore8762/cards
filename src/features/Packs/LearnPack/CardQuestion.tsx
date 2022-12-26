import React, { useState } from 'react'

import { Button, Card } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { CardAnswer } from './CardAnswer'
import s from './CardQuestion.module.css'

export const CardQuestion = () => {
  const [isClickButton, setIsClickButton] = useState(false)

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: 440, minHeight: 200 }} style={{ marginTop: '100px' }}>
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
