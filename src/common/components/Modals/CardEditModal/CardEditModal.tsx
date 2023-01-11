import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { IconButton } from '@mui/material'

import { CardBasicModal } from '../CardBasicModal/CardBasicModal'

type CardEditModalPropsType = {
  questionDomainValue: string
  answerDomainValue: string
  // questionImageDomainValue?: string
  saveItem: (
    questionInputValue: string,
    answerInputValue: string
    // questionImageDomainValue?: string
  ) => void
}

export const CardEditModal: React.FC<CardEditModalPropsType> = ({
  saveItem,
  questionDomainValue,
  answerDomainValue,
  // questionImageDomainValue,
}) => {
  return (
    <CardBasicModal
      headerTitle={'Edit Card'}
      saveItem={saveItem}
      questionDomainValue={questionDomainValue}
      answerDomainValue={answerDomainValue}
    >
      <IconButton>
        <BorderColorOutlined />
      </IconButton>
    </CardBasicModal>
  )
}
