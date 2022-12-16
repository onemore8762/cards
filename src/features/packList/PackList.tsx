import React from 'react'

import { BasicTable } from './Table/BasicTable'

export const PackList = () => {
  const headerInTable = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

  return (
    <div>
      <BasicTable headerInTable={headerInTable} />
    </div>
  )
}
