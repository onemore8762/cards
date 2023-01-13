import React, { cloneElement, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
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

type DeletePackModalPropsType = {
  children: JSX.Element
  headerTitle: string
  packName: string
  deleteItem: () => void
  handleCloseUserMenu?: () => void
}

export const DeleteBasicModal: React.FC<DeletePackModalPropsType> = ({
  children,
  headerTitle,
  deleteItem,
  packName,
  handleCloseUserMenu,
}) => {
  // menu
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
    handleCloseUserMenu?.()
  }
  const handleClose = () => setOpen(false)

  // button for props
  const clonedChildren = cloneElement(children, {
    onClick: handleOpen,
  })

  // functions
  const deleteBtnHandler = () => {
    deleteItem()
    handleClose()
  }

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
              <div className={s.modalContent_text}>
                <p>
                  Do you really want to remove <b>{packName}</b>?
                </p>
                <p>All cards will be deleted.</p>
              </div>
              <div className={s.deleteModal_buttons}>
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
                    color={'error'}
                    sx={{
                      width: '170px',
                      borderRadius: '30px',
                    }}
                    onClick={deleteBtnHandler}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
