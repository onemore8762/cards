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

import style from './CardAnswer.module.css'
import s from './CardQuestion.module.css'
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
        <Card sx={{ width: 440, minHeight: 200 }}>
          <div className={s.cardQuestion_main}>
            <div className={s.cardQuestion_question}>
              <b>Question:</b> {randomCard.question}
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
                  sx={{ borderRadius: '30px', mt: 3 }}
                  style={{ width: 335 }}
                >
                  Show Answer
                </Button>
              )}
              {isClickButton && (
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
                /*<CardAnswer
                  packId={packId}
                  setIsClickButton={setIsClickButton}
                  setAnswerHandler={setAnswerHandler}
                />*/
              )}
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}
