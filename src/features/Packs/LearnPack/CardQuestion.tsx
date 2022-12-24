import React from 'react'

import { Button, Card } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import s from './CardQuestion.module.css'

export const CardQuestion = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Card sx={{ width: 440, height: 200 }} style={{ marginTop: '100px' }}>
          <div className={s.cardQuestion_main}>
            <div className={s.cardQuestion_question}>
              <b>Question:</b> Question Will Be Here
            </div>
            <div className={s.cardQuestion_attempt}>Number of attempts for this question: 10</div>
            <div className={s.cardQuestion_button}>
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={() => {}}
                sx={{ borderRadius: '30px', mt: 3 }}
                style={{ width: 335 }}
              >
                Show Answer
              </Button>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}
