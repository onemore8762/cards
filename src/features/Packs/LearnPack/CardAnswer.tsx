import React from 'react'

import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { RadioGroupSelect } from '../../../common/components/RadioGroupSelect/RadioGroupSelect'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'

import style from './CardAnswer.module.css'
import s from './CardQuestion.module.css'
import { getRandomCardTC, updateGradeTC } from './learnPack-reducer'
import { selectLearnGrade, selectLearnRandomCard } from './learnPackSelectors'

type CardAnswerPropsType = {
  packId?: string
  setIsClickButton: (isClicked: boolean) => void
  setAnswerHandler: () => void
}

export const CardAnswer: React.FC<CardAnswerPropsType> = ({
  // packId,
  // setIsClickButton,
  setAnswerHandler,
}) => {
  // const dispatch = useAppDispatch()
  const randomCard = useAppSelector(selectLearnRandomCard)
  // const grade = useAppSelector(selectLearnGrade)

  // const setAnswerHandler = () => {
  //   dispatch(updateGradeTC(randomCard._id, grade))
  //   if (packId) dispatch(getRandomCardTC(packId))
  //   setIsClickButton(false)
  // }

  return (
    <Grid container justifyContent={'center'}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <div className={s.cardQuestion_main}>
          <div className={style.cardAnswer_answer}>
            <b>Answer:</b> {randomCard.answer}
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
