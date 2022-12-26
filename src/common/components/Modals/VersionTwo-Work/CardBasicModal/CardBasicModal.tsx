import React, { cloneElement, ReactNode, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'

import { SelectInput } from '../../../SelectInput/SelectInput'
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

type AddCardModalPropsType = {
  children: JSX.Element
  headerTitle: ReactNode
  saveItem: () => void
}

export const CardBasicModal: React.FC<AddCardModalPropsType> = ({
  children,
  headerTitle,
  saveItem,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const saveBtnHandler = () => {
    saveItem()
    handleClose()
  }

  const clonedChildren = cloneElement(children, {
    onClick: handleOpen,
  })

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
                <div className={s.newCardModal_textField_select}>
                  <SelectInput />
                </div>
                <div className={s.newCardModal_textField}>
                  <div>
                    <TextField
                      id="standard-basic"
                      label="Question"
                      variant="standard"
                      sx={{ width: 360 }}
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-basic"
                      label="Answer"
                      variant="standard"
                      sx={{ width: 360 }}
                      style={{ marginBottom: '25px' }}
                    />
                  </div>
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
