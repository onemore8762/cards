import React from 'react'

import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { RadioGroupSelect } from '../../../common/components/RadioGroupSelect/RadioGroupSelect'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

import style from './CardAnswer.module.css'
import s from './CardQuestion.module.css'
import { updateGradeTC } from './learn-pack-reducer'

type PropsType = {
  randomQuestion: any
}

export const CardAnswer = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const grade = useAppSelector(state => state.learnPack.grade)
  const setAnswerHandler = () => {
    dispatch(updateGradeTC(props.randomQuestion._id, grade))
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <div className={s.cardQuestion_main}>
          <div className={style.cardAnswer_answer}>
            <b>Answer:</b> {props.randomQuestion.answer}
          </div>
          <div className={style.cardAnswer_rateYourself}>
            <RadioGroupSelect />
          </div>
          <div className={s.cardQuestion_button}>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={setAnswerHandler}
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
