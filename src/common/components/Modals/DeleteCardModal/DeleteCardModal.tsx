import React from 'react'

import Button from '@mui/material/Button'

import { BasicModal } from '../BasicModal/BasicModal'
import s from '../BasicModal/BasicModal.module.css'

export const DeleteCardModal = () => {
  return (
    <BasicModal titleChildren={'Delete Card'}>
      <div className={s.packModal_main}>
        <div>
          <p>
            Do you really want to remove <b>Card Name</b>?
          </p>
          <p>All cards will be deleted.</p>
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
              onClick={() => {}}
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
              onClick={() => {}}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </BasicModal>
  )
}
