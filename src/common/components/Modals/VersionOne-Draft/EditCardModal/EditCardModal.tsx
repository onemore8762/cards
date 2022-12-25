import React from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { SelectInput } from '../../../SelectInput/SelectInput'
import { BasicModal } from '../BasicModal/BasicModal'
import s from '../BasicModal/BasicModal.module.css'

export const EditCardModal = () => {
  return (
    <BasicModal headerTitle={'Edit Card'}>
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
              onClick={() => {}}
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
              onClick={() => {}}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </BasicModal>
  )
}
