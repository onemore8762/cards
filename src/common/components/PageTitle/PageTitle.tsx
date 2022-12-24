import React from 'react'

import s from './PageTitle.module.css'

type PageTitleProps = {
  title: string
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return <div className={s.pageTitle}>{title}</div>
}
