import React, { useState } from 'react'

import style from './FilterShow.module.css'

export const FilterShow = () => {
  const [active, setActive] = useState<boolean>(false)

  const showMyHandler = () => {
    setActive(!active)
  }

  return (
    <div className={style.filterShow}>
      <div onClick={showMyHandler}>My</div>
      <div>All</div>
    </div>
  )
}
