import React, { ReactNode } from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { IconButton } from '@mui/material'

import { DeleteBasicModal } from '../DeleteBasicModal/DeleteBasicModal'

type DeleteCardModalPropsType = {
  packName: string
  deleteItem: () => void
}

export const DeleteCardModal: React.FC<DeleteCardModalPropsType> = ({ packName, deleteItem }) => {
  return (
    <DeleteBasicModal headerTitle={'Delete Card'} packName={packName} deleteItem={deleteItem}>
      <IconButton>
        <DeleteOutlineIcon />
      </IconButton>
    </DeleteBasicModal>
  )
}
