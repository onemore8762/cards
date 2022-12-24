import React from 'react'

import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { BasicModal } from '../BasicModal/BasicModal'
import s from '../BasicModal/BasicModal.module.css'

export const EditPackModal = () => {
  return (
    <BasicModal titleChildren={'Edit Pack'}>
      <div className={s.packModal_main}>
        <div>
          <TextField id="standard-basic" label="Pack Name" variant="standard" sx={{ width: 360 }} />
        </div>
        <div className={s.packModal_checkbox}>
          <FormGroup>
            <FormControlLabel label={'Private Pack'} control={<Checkbox />} />
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
