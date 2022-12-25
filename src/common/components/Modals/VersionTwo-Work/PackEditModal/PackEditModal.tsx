import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { IconButton } from '@mui/material'

import { PackBasicModal } from '../PackBasicModal/PackBasicModal'

type EditPackModalPropsType = {
  saveItem: () => void
}

export const PackEditModal: React.FC<EditPackModalPropsType> = ({ saveItem }) => {
  return (
    <PackBasicModal headerTitle={'Edit Pack'} saveItem={saveItem}>
      <IconButton>
        <BorderColorOutlined />
      </IconButton>
    </PackBasicModal>
  )
}
