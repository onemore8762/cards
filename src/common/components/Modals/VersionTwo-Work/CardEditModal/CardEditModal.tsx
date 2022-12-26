import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { IconButton } from '@mui/material'

import { CardBasicModal } from '../CardBasicModal/CardBasicModal'

type CardEditModalPropsType = {
  saveItem: (questionInputValue: string, answerInputValue: string /*questionType: string*/) => void
}

export const CardEditModal: React.FC<CardEditModalPropsType> = ({ saveItem }) => {
  return (
    <CardBasicModal headerTitle={'Edit Card'} saveItem={saveItem}>
      <IconButton>
        <BorderColorOutlined />
      </IconButton>
    </CardBasicModal>
  )
}
