import React from 'react'

import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { RadioGroupSelect } from '../../../common/components/RadioGroupSelect/RadioGroupSelect'

import style from './CardAnswer.module.css'
import s from './CardQuestion.module.css'

export const CardAnswer = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <div className={s.cardQuestion_main}>
          <div className={style.cardAnswer_answer}>
            <b>Answer:</b> Answer Will Be Here
          </div>
          <div className={style.cardAnswer_rateYourself}>
            <RadioGroupSelect />
          </div>
          <div className={s.cardQuestion_button}>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() => {}}
              sx={{ borderRadius: '30px', mt: 3 }}
              style={{ width: 335 }}
            >
              Next
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}
