import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'

type EditableSpanPropsType = {
  title: string
  onChangeInput: (newInputValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const onClickEditSpanHandler = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const onClickNotEditSpanHandler = () => {
    props.onChangeInput(title)
    setEditMode(false)
  }

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const enterChangeTitleHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    return event.key === 'Enter' ? onClickNotEditSpanHandler() : ''
  }

  return editMode ? (
    <TextField
      label="Nickname"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              size={'small'}
              onClick={onClickNotEditSpanHandler}
              style={{ marginBottom: '10px' }}
            >
              Save
            </Button>
          </InputAdornment>
        ),
      }}
      variant="standard"
      autoFocus
      value={title}
      onChange={onChangeInputHandler}
      // onBlur={onClickNotEditSpanHandler}
      onKeyDown={enterChangeTitleHandler}
    />
  ) : (
    <div>
      <span /*onDoubleClick={onClickEditSpanHandler}*/ style={{ fontSize: '20px' }}>
        {props.title}
      </span>
      <BorderColorOutlined
        sx={{ paddingLeft: '10px' }}
        fontSize={'small'}
        onClick={onClickEditSpanHandler}
      />
    </div>
  )
})
