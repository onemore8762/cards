import React, { ChangeEvent, cloneElement, useEffect, useState } from 'react'

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

import DefaultQuestionImage from '../../../../assets/images/DefaultQuestionImage.jpg'
import { imageErrorHandler, showFileAfterUploading, uploadHandler } from '../../../utils/uploadFile'
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

export type QuestionItemPropsType = {
  answer: string
  question?: string
  questionImg?: string
}

type AddCardModalPropsType = {
  children: JSX.Element
  headerTitle: string
  questionDomainValue?: string
  answerDomainValue?: string
  questionImageDomainValue?: string
  saveItem: (item: QuestionItemPropsType) => void
}

export const CardBasicModal: React.FC<AddCardModalPropsType> = ({
  children,
  headerTitle,
  saveItem,
  questionDomainValue,
  answerDomainValue,
  questionImageDomainValue,
}) => {
  // menu
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setErrorQuestion('')
    setErrorAnswer('')
  }

  // button for props
  const clonedChildren = cloneElement(children, {
    onClick: handleOpen,
  })

  // local state
  const [questionType, setQuestionType] = useState<string>('text')
  const [questionInputValue, setQuestionInputValue] = useState<string | undefined>('')
  const [questionImage, setQuestionImage] = useState<string | undefined>(DefaultQuestionImage)
  const [answerInputValue, setAnswerInputValue] = useState<string>('')
  const [errorQuestion, setErrorQuestion] = useState<string | null>(null)
  const [errorAnswer, setErrorAnswer] = useState<string | null>(null)
  const [isImageFileBroken, setIsImageFileBroken] = useState<boolean>(false)

  const INPUT_MAX_LENGTH = 100
  const MESSAGE_INPUT_VALUE_REQUIRED = `Text length must be 1-${INPUT_MAX_LENGTH} symbols`
  const MESSAGE_INPUT_VALUE_LENGTH = `Text length must be maximum ${INPUT_MAX_LENGTH} symbols`

  // onChange functions
  const onChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionInputValue(event.currentTarget.value)
  }
  const onChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerInputValue(event.currentTarget.value)
  }
  const onChangeSelectHandler = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value as string)
  }

  // save card
  const saveBtnHandler = () => {
    const trimQuestionValue = questionInputValue?.trim()
    const trimAnswerValue = answerInputValue.trim()

    if (
      (questionType === 'text' && trimQuestionValue && trimAnswerValue) ||
      (questionType === 'image' && trimAnswerValue)
    ) {
      if (questionType === 'text') {
        setQuestionImage(undefined)
        saveItem({ answer: trimAnswerValue, question: trimQuestionValue, questionImg: undefined })
      } else {
        setQuestionInputValue(undefined)
        saveItem({
          answer: trimAnswerValue,
          question: 'Image Question',
          questionImg: questionImage,
        })
      }

      setQuestionInputValue('')
      setAnswerInputValue('')
      setQuestionType('text')
      setQuestionImage(DefaultQuestionImage)
      handleClose()
    } else {
      setErrorQuestion(`${MESSAGE_INPUT_VALUE_REQUIRED}`)
      setErrorAnswer(`${MESSAGE_INPUT_VALUE_REQUIRED}`)
    }
  }

  // render
  // errors flow
  useEffect(() => {
    if (questionInputValue && questionInputValue!.length > INPUT_MAX_LENGTH) {
      setErrorQuestion(`${MESSAGE_INPUT_VALUE_LENGTH}`)
    } else {
      setErrorQuestion(null)
    }
    if (answerInputValue && answerInputValue.length > INPUT_MAX_LENGTH) {
      setErrorAnswer(`${MESSAGE_INPUT_VALUE_LENGTH}`)
    } else {
      setErrorAnswer(null)
    }
  }, [questionInputValue, answerInputValue])

  // data from server
  useEffect(() => {
    if (questionDomainValue) {
      setQuestionInputValue(questionDomainValue)
    }
    if (answerDomainValue) {
      setAnswerInputValue(answerDomainValue!)
    }
    if (questionImageDomainValue) {
      setQuestionImage(questionImageDomainValue)
      setQuestionType('image')
    }
  }, [questionDomainValue, answerDomainValue, questionImageDomainValue])

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
                        onChange={onChangeSelectHandler}
                      >
                        <MenuItem value={'text'} selected>
                          Text
                        </MenuItem>
                        <MenuItem value={'image'}>Image</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className={s.newCardModal_textField}>
                  {questionType === 'image' ? (
                    <>
                      <div className={s.packCoverImage}>
                        <img
                          src={showFileAfterUploading(
                            questionImageDomainValue,
                            questionImage,
                            DefaultQuestionImage
                          )}
                          alt="Question Image"
                          onError={() => imageErrorHandler(setIsImageFileBroken)}
                        />
                      </div>
                      <div>
                        <Button variant="contained" component="label" style={{ width: '100%' }}>
                          Upload Image for Question
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={event => uploadHandler(event, setQuestionImage)}
                          />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <TextField
                        value={questionInputValue}
                        error={!!errorQuestion}
                        onChange={onChangeQuestionHandler}
                        helperText={errorQuestion}
                        id="standard-basic"
                        label="Question"
                        variant="standard"
                        sx={{ width: 360, height: 50 }}
                      />
                    </div>
                  )}

                  <div>
                    <TextField
                      value={answerInputValue}
                      error={!!errorAnswer}
                      onChange={onChangeAnswerHandler}
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
                        questionInputValue!.length > INPUT_MAX_LENGTH ||
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
