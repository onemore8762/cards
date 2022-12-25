import React, { ReactElement, ReactNode, useState } from 'react'

// import Backdrop from '@mui/material/Backdrop'
import ClearIcon from '@mui/icons-material/Clear'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'

// import Typography from '@mui/material/Typography'
import s from './BasicModal.module.css'

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

type ModalPropsType = {
  children: ReactNode
  headerTitle: ReactNode
  buttonTitle?: ReactNode
  // modalButton?: ReactNode
}

export const BasicModal: React.FC<ModalPropsType> = ({
  children,
  headerTitle,
  buttonTitle,
  // modalButton,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button
        onClick={handleOpen}
        type={'submit'}
        variant={'contained'}
        color={'primary'}
        sx={{
          width: '175px',
          borderRadius: '30px',
        }}
      >
        {buttonTitle}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className={s.modalHeader}>
              <div className={s.headerName}>{headerTitle}</div>
              <div className={s.headerCloseBtn}>
                <ClearIcon onClick={handleClose} />
              </div>
            </div>
            <div className={s.modalContent}>{children}</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
