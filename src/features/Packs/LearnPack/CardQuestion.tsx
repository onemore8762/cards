import React, { useEffect, useState } from 'react'

import { Button, Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useParams } from 'react-router-dom'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { PATH } from '../../../common/path/path'

import { CardAnswer } from './CardAnswer'
import s from './CardQuestion.module.css'
import { getCardListTC } from './learn-pack-reducer'

export const CardQuestion = () => {
  const dispatch = useAppDispatch()
  const [isClickButton, setIsClickButton] = useState(false)
  const { packId } = useParams()
  const packName = useAppSelector(state => state.learnPack.packName)
  const randomQuestion = useAppSelector(state => state.learnPack.cardList)

  useEffect(() => {
    if (packId) dispatch(getCardListTC(packId))
  }, [])

  return (
    <Grid container justifyContent={'center'}>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <Grid display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
        <Typography component="legend" variant="h5" sx={{ mt: 9, mb: 2 }}>
          {packName}
        </Typography>
        <Card sx={{ width: 440, minHeight: 200 }}>
          <div className={s.cardQuestion_main}>
            <div className={s.cardQuestion_question}>
              <b>Question:</b> {randomQuestion[0].question}
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
              {isClickButton && <CardAnswer randomQuestion={randomQuestion} />}
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}
