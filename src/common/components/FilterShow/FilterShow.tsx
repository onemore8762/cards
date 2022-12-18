import React, { useState } from 'react'

import style from './FilterShow.module.css'

export const FilterShow = () => {
  const [active, setActive] = useState<boolean>(false)

  const showActiveHandler = () => {
    setActive(!active)
  }

  const showMy = `${!active && style.showActive}`
  const showAll = `${active && style.showActive}`

  return (
    <div className={style.filterShow}>
      <div className={`${style.filterShow_item} ${showMy}`} onClick={showActiveHandler}>
        My
      </div>
      <div className={`${style.filterShow_item} ${showAll}`} onClick={showActiveHandler}>
        All
      </div>
    </div>
  )
}
