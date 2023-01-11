import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { IconButton } from '@mui/material'

import { CardBasicModal, QuestionItemPropsType } from '../CardBasicModal/CardBasicModal'

type CardEditModalPropsType = {
  questionDomainValue: string
  answerDomainValue: string
  saveItem: (item: QuestionItemPropsType) => void
}

export const CardEditModal: React.FC<CardEditModalPropsType> = ({
  saveItem,
  questionDomainValue,
  answerDomainValue,
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
