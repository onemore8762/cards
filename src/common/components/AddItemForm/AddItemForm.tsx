import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { IconButton, TextField } from '@mui/material'

export type TextFieldInputPropsType = {
  addItem: (titleInput: string) => void
  disabled?: boolean
}

export const AddItemForm: React.FC<TextFieldInputPropsType> = React.memo(
  ({ addItem, disabled = false }) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const MESSAGE_INPUT_VALUE_REQUIRED = 'Поле обязательно для заполнения!'

    const callBackButtonHandler = () => {
      const trimValue = inputValue.trim()

      if (trimValue) {
        addItem(trimValue)
        setInputValue('')
      } else {
        setError(`${MESSAGE_INPUT_VALUE_REQUIRED}`)
      }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError('')
      }

      return event.key === 'Enter' ? callBackButtonHandler() : ''
    }

    return (
      <div>
        <TextField
          variant="outlined"
          label="Введите текст"
          onChange={onChangeInputHandler}
          onKeyDown={onKeyDownHandler}
          value={inputValue}
          error={!!error}
          helperText={error}
          disabled={disabled}
        />
        <IconButton
          onClick={callBackButtonHandler}
          color="primary"
          size="medium"
          disabled={disabled}
        >
          {/*<AddComment />*/}
        </IconButton>
      </div>
    )
  }
)
