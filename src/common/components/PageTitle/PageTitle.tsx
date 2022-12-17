import React from 'react'

import style from './PageTitle.module.css'

type PageTitleProps = {
  title: string
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return <div className={style.pageTitle}>{title}</div>
}
