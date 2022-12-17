import React from 'react'

import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../path/path'

import style from './BackToPacksListButton.module.css'

export const BackToPacksListButton = () => {
  const navigate = useNavigate()

  const backButtonHandler = () => {
    // alert('back')
    navigate(PATH.PROFILE.PACKLIST)
  }

  return (
    <div className={style.backButton} onClick={backButtonHandler}>
      <KeyboardBackspace />
      <div className={style.backButton_title}>Back to Packs List</div>
    </div>
  )
}
