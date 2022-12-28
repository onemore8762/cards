import React, { ChangeEvent, cloneElement, KeyboardEvent, useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'

import s from '../BasicModal.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #c7c7c7',
  boxShadow: 24,
  // p: 4,
}

type AddPackModalPropsType = {
  children: JSX.Element
  headerTitle: string
  packName?: string
  saveItem: (inputValue: string, privateCheckbox: boolean) => void
  handleCloseUserMenu?: () => void
}

export const PackBasicModal: React.FC<AddPackModalPropsType> = ({
  children,
  headerTitle,
  packName,
  saveItem,
  handleCloseUserMenu,
}) => {
  // menu
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
    handleCloseUserMenu?.()
  }
  const handleClose = () => setOpen(false)

  // text field flow
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [privateCheckbox, setPrivateCheckbox] = useState<boolean>(false)

  const INPUT_MAX_LENGTH = 40
  const MESSAGE_INPUT_VALUE_REQUIRED = 'Text length must be minimum 1 symbol'
  const MESSAGE_INPUT_VALUE_LENGTH = `Text length must be maximum ${INPUT_MAX_LENGTH} symbols`

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  // const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (error !== null) {
  //     setError('')
  //   }
  //
  //   return event.key === 'Enter' ? saveBtnHandler() : ''
  // }

  const saveBtnHandler = () => {
    const trimValue = inputValue.trim()

    if (trimValue) {
      saveItem(trimValue, privateCheckbox)
      setInputValue('')
      handleClose()
    } else {
      setError(`${MESSAGE_INPUT_VALUE_REQUIRED}`)
    }
  }

  const changePrivateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let newPrivateValue = event.currentTarget.checked

    setPrivateCheckbox(newPrivateValue)
  }

  // button for props
  const clonedChildren = cloneElement(children, {
    onClick: handleOpen,
  })

  // render
  useEffect(() => {
    if (packName) {
      setInputValue(packName)
    }
  }, [packName])

  useEffect(() => {
    if (inputValue && inputValue.length > INPUT_MAX_LENGTH) {
      setError(`${MESSAGE_INPUT_VALUE_LENGTH}`)
    }
  }, [inputValue])

  return (
    <>
      {clonedChildren}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <div className={s.modalHeader}>
              <div className={s.headerName}>{headerTitle}</div>
              <div className={s.headerCloseBtn}>
                <ClearIcon onClick={handleClose} />
              </div>
            </div>
            <div className={s.modalContent}>
              <div className={s.packModal_main}>
                <div>
                  <TextField
                    value={inputValue}
                    error={!!error}
                    onChange={onChangeInputHandler}
                    // onKeyDown={onKeyDownHandler}
                    helperText={error}
                    id="standard-basic"
                    label="New Pack Name"
                    variant="standard"
                    sx={{ width: 360, height: 50 }}
                  />
                </div>
                <div className={s.packModal_checkbox}>
                  <FormGroup>
                    <FormControlLabel
                      label={'Private Pack'}
                      control={
                        <Checkbox checked={privateCheckbox} onChange={changePrivateHandler} />
                      }
                    />
                  </FormGroup>
                </div>
                <div className={s.packModal_buttons}>
                  <div>
                    <Button
                      type={'submit'}
                      variant={'outlined'}
                      color={'primary'}
                      sx={{
                        width: '170px',
                        borderRadius: '30px',
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div>
                    <Button
                      type={'submit'}
                      variant={'contained'}
                      color={'primary'}
                      sx={{
                        width: '170px',
                        borderRadius: '30px',
                      }}
                      onClick={saveBtnHandler}
                      disabled={inputValue.length > INPUT_MAX_LENGTH}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
