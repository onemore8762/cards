import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { IconButton } from '@mui/material'

import { PackBasicModal } from '../PackBasicModal/PackBasicModal'

type EditPackPropsType = {
  saveItem: () => void
}

export const PackEditModal: React.FC<EditPackPropsType> = ({ saveItem }) => {
  return (
    <PackBasicModal headerTitle={'Edit Pack'} saveItem={saveItem}>
      <IconButton>
        <BorderColorOutlined />
      </IconButton>
    </PackBasicModal>
  )
}
