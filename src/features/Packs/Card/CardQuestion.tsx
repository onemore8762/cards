import React, { useEffect, useState } from 'react'

import { Button, Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useParams } from 'react-router-dom'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { RadioGroupSelect } from '../../../common/components/RadioGroupSelect/RadioGroupSelect'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/path/path'

import s from './CardQuestion.module.css'
import { CardQuestion_ButtonStyle, CardQuestion_CardStyle } from './CardQuestionStyles'
import { getRandomCardTC, updateGradeTC } from './learnPack-reducer'
import { selectLearnGrade, selectLearnPackName, selectLearnRandomCard } from './learnPackSelectors'

export const CardQuestion = () => {
  const dispatch = useAppDispatch()
  const [isClickButton, setIsClickButton] = useState(false)
  const { packId } = useParams()
  const packName = useAppSelector(selectLearnPackName)
  const grade = useAppSelector(selectLearnGrade)
  const randomCard = useAppSelector(selectLearnRandomCard)

  const setAnswerHandler = () => {
    if (packId) dispatch(updateGradeTC(packId, randomCard._id, grade))
    setIsClickButton(false)
  }

  useEffect(() => {
    if (packId) dispatch(getRandomCardTC(packId))
  }, [packId])

  return (
    <Grid container justifyContent={'center'}>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <Grid display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
        <Typography component="legend" variant="h5" sx={{ mt: 5, mb: 2 }}>
          {packName}
        </Typography>
        <Card sx={CardQuestion_CardStyle}>
          <div className={s.cardQuestion_main}>
            <div className={s.cardQuestion_question}>
              <div className={s.cardQuestion_question_title}>Question:</div>
              {randomCard.questionImg ? (
                <div>
                  <img src={randomCard.questionImg} alt="Image Question" />
                </div>
              ) : (
                <div className={s.cardQuestion_question_question}>{randomCard.question}</div>
              )}
            </div>
            <div className={s.cardQuestion_attempt}>
              Number of attempts for this question: {randomCard.shots}
            </div>
            <div className={s.cardQuestion_button}>
              {!isClickButton && (
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={() => setIsClickButton(true)}
                  sx={CardQuestion_ButtonStyle}
                >
                  Show Answer
                </Button>
              )}
              {isClickButton && (
                <Grid container justifyContent={'center'}>
                  <Grid display="flex" justifyContent="center" alignItems="center">
                    <div className={s.cardQuestion_main}>
                      <div className={s.cardAnswer_answer}>
                        <div className={s.cardQuestion_question_title}>Answer:</div>
                        {randomCard.answer}
                      </div>
                      <div className={s.cardAnswer_rateYourself}>
                        <RadioGroupSelect />
                      </div>
                      <div className={s.cardQuestion_button}>
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          onClick={setAnswerHandler}
                          sx={CardQuestion_ButtonStyle}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              )}
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}
