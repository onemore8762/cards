import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { IconButton } from '@mui/material'

import { PackBasicModal } from '../PackBasicModal/PackBasicModal'

type EditPackModalPropsType = {
  packName: string
  packCover?: string
  saveItem: (inputValue: string, packCoverState: string, privateCheckbox: boolean) => void
}

export const PackEditModal: React.FC<EditPackModalPropsType> = ({
  packName,
  packCover,
  saveItem,
}) => {
  return (
    <PackBasicModal
      headerTitle={'Edit Pack'}
      saveItem={saveItem}
      packName={packName}
      packCover={packCover}
    >
      <IconButton>
        <BorderColorOutlined />
      </IconButton>
    </PackBasicModal>
  )
}
