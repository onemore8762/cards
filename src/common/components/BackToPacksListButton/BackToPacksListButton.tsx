import React from 'react'

import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../path/path'

import style from './BackToPacksListButton.module.css'

export const BackToPacksListButton = (props: propsType) => {
  const navigate = useNavigate()

  const backButtonHandler = () => {
    // alert('back')
    navigate(props.route)
  }

  return (
    <div className={style.backButton} onClick={backButtonHandler}>
      <KeyboardBackspace />
      <div className={style.backButton_title}>{props.title}</div>
    </div>
  )
}
type propsType = {
  route: string
  title: string
}
