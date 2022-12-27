import React, {
  ChangeEvent,
  cloneElement,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Select, { SelectChangeEvent } from '@mui/material/Select'

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
  headerTitle: string
  questionDomainValue?: string
  answerDomainValue?: string
  saveItem: (questionInputValue: string, answerInputValue: string /*questionType: string*/) => void
}

export const CardBasicModal: React.FC<AddCardModalPropsType> = ({
  children,
  headerTitle,
  saveItem,
  questionDomainValue,
  answerDomainValue,
}) => {
  // menu
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // text field flow
  const [questionType, setQuestionType] = useState<string>('')
  const [questionInputValue, setQuestionInputValue] = useState<string>('')
  const [answerInputValue, setAnswerInputValue] = useState<string>('')
  // const [error, setError] = useState<string | null>(null)
  const [errorQuestion, setErrorQuestion] = useState<string | null>(null)
  const [errorAnswer, setErrorAnswer] = useState<string | null>(null)

  const INPUT_MAX_LENGTH = 40
  const MESSAGE_INPUT_VALUE_REQUIRED = 'Text length must be minimum 1 symbol'
  const MESSAGE_INPUT_VALUE_LENGTH = `Text length must be maximum ${INPUT_MAX_LENGTH} symbols`

  const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionInputValue(event.currentTarget.value)
  }
  const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerInputValue(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (questionInputValue !== null || answerInputValue !== null) {
      setErrorQuestion('')
      setErrorAnswer('')
    }

    return event.key === 'Enter' ? saveBtnHandler() : ''
  }

  const changeSelectHandler = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value as string)
  }

  const saveBtnHandler = () => {
    const trimQuestionValue = questionInputValue.trim()
    const trimAnswerValue = answerInputValue.trim()

    if (trimQuestionValue && trimAnswerValue /*&& questionType*/) {
      saveItem(trimQuestionValue, trimAnswerValue /*, questionType*/)
      setQuestionInputValue('')
      setAnswerInputValue('')
      // setQuestionType('')
      handleClose()
    } else {
      setErrorQuestion(`${MESSAGE_INPUT_VALUE_REQUIRED}`)
      setErrorAnswer(`${MESSAGE_INPUT_VALUE_REQUIRED}`)
    }
  }

  // render
  useEffect(() => {
    if (questionInputValue.length > INPUT_MAX_LENGTH) {
      setErrorQuestion(`${MESSAGE_INPUT_VALUE_LENGTH}`)
    }
    if (answerInputValue.length > INPUT_MAX_LENGTH) {
      setErrorAnswer(`${MESSAGE_INPUT_VALUE_LENGTH}`)
    }
  }, [questionInputValue, answerInputValue])

  useEffect(() => {
    if (questionDomainValue && answerDomainValue) {
      setQuestionInputValue(questionDomainValue)
      setAnswerInputValue(answerDomainValue)
    }
  }, [questionDomainValue, answerDomainValue])

  // button for props
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
                  {/*<SelectInput />*/}

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Choose a Question Format
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={questionType}
                        label="Choose a Question Format"
                        onChange={changeSelectHandler}
                      >
                        <MenuItem value={'text'}>Text</MenuItem>
                        <MenuItem value={'image'}>Image</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className={s.newCardModal_textField}>
                  <div>
                    <TextField
                      value={questionInputValue}
                      error={!!errorQuestion}
                      onChange={onChangeQuestionHandler}
                      onKeyDown={onKeyDownHandler}
                      helperText={errorQuestion}
                      id="standard-basic"
                      label="Question"
                      variant="standard"
                      sx={{ width: 360, height: 50 }}
                    />
                  </div>
                  <div>
                    <TextField
                      value={answerInputValue}
                      error={!!errorAnswer}
                      onChange={onChangeAnswerHandler}
                      onKeyDown={onKeyDownHandler}
                      helperText={errorAnswer}
                      id="standard-basic"
                      label="Answer"
                      variant="standard"
                      sx={{ width: 360, height: 50 }}
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
                      disabled={
                        questionInputValue.length > INPUT_MAX_LENGTH ||
                        answerInputValue.length > INPUT_MAX_LENGTH
                      }
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
