import React from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { IconButton } from '@mui/material'

import { DeleteBasicModal } from '../DeleteBasicModal/DeleteBasicModal'

type DeleteCardPropsType = {
  deleteItem: () => void
}

export const DeleteCardModal: React.FC<DeleteCardPropsType> = ({ deleteItem }) => {
  return (
    <DeleteBasicModal headerTitle={'Delete Card'} packName={'Card Name'} deleteItem={deleteItem}>
      <IconButton>
        <DeleteOutlineIcon />
      </IconButton>
    </DeleteBasicModal>
  )
}
