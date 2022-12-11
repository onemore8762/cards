import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
// import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'

export type EditableSpanPropsType = {
  title: string
  onChangeInput: (newInputValue: string) => void
}

// пример компоненты
// <EditableSpan title={props.task.title}
//               onChangeInput={changeTaskTitleHandler}
// />

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
            <Button variant="contained">Save</Button>
          </InputAdornment>
        ),
      }}
      variant="standard"
      autoFocus
      value={title}
      onChange={onChangeInputHandler}
      onBlur={onClickNotEditSpanHandler}
      onKeyDown={enterChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={onClickEditSpanHandler} style={{ fontSize: '20px' }}>
      {props.title}
    </span>
  )
})
