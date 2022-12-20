import React from 'react'

import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

import style from './BackToPacksListButton.module.css'

type propsType = {
  title: string
  route: string
}

export const BackToPacksListButton = (props: propsType) => {
  const navigate = useNavigate()

  const backButtonHandler = () => {
    navigate(props.route)
  }

  return (
    <div className={style.backButton} onClick={backButtonHandler}>
      <KeyboardBackspace />
      <div className={style.backButton_title}>{props.title}</div>
    </div>
  )
}
