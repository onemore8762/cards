import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { IconButton } from '@mui/material'

import { PackBasicModal } from '../PackBasicModal/PackBasicModal'

type EditPackModalPropsType = {
  packName: string
  saveItem: (inputValue: string, privateCheckbox: boolean) => void
}

export const PackEditModal: React.FC<EditPackModalPropsType> = ({ packName, saveItem }) => {
  return (
    <PackBasicModal headerTitle={'Edit Pack'} saveItem={saveItem} packName={packName}>
      <IconButton>
        <BorderColorOutlined />
      </IconButton>
    </PackBasicModal>
  )
}
