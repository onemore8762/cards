import React from 'react'

import { CircularProgress, Rating, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'

import { QuestionItemPropsType } from '../../../common/components/Modals/CardBasicModal/CardBasicModal'
import { CardEditModal } from '../../../common/components/Modals/CardEditModal/CardEditModal'
import { DeleteCardModal } from '../../../common/components/Modals/DeleteCardModal/DeleteCardModal'
import { SkeletonComponent } from '../../../common/components/Skeleton/Skeleton'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { Table_CellStyle } from '../../../common/styles/CardStyles'
import s from '../../../common/styles/CommonStyles.module.css'
import { createStyle } from '../../../common/utils/createStyle'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { Cards } from '../Card/card-api'
import { deleteCardTC, sortCardsAC, updateCardTC } from '../Card/card-reducer'
import { selectPackUserId, selectSortCard } from '../Card/cardSelectors'

import style from './CardTable.module.css'

type PackTablePropsType = {
  cardsList: Array<Cards>
  isLoading: boolean
}

export const CardTable: React.FC<PackTablePropsType> = ({ cardsList, isLoading }) => {
  const dispatch = useAppDispatch()
  const sort = useAppSelector(selectSortCard)
  const userId = useAppSelector(selectProfileUserId)
  const createdId = useAppSelector(selectPackUserId)

  const sortTableHandler = () => {
    dispatch(sortCardsAC())
  }
  const updateCardHandler = (item: {
    _id: string
    question?: string
    answer: string
    questionImg?: string
  }) => {
    dispatch(updateCardTC(item))
  }
  const deleteCardHandler = (idCard: string) => {
    dispatch(deleteCardTC(idCard))
  }

  // image in table and limit of name length
  // const questionField = (questionImg: string, question: string) => {
  //   if (questionImg) {
  //     return questionImg
  //   } else {
  //     if (question && question.length >= 30) {
  //       return question.slice(0, 29) + '...'
  //     } else {
  //       return question
  //     }
  //   }
  // }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '450px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            <TableCell style={createStyle(30)}>Question</TableCell>
            <TableCell style={createStyle(30)}>Answer</TableCell>
            <TableCell style={createStyle(20)}>
              <TableSortLabel
                active
                direction={sort === '0updated' ? 'desc' : 'asc'}
                onClick={sortTableHandler}
              >
                Last Updated
              </TableSortLabel>
            </TableCell>
            <TableCell style={createStyle(20)}>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsList.map(row => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={Table_CellStyle}>
                <SkeletonComponent isLoading={isLoading}>
                  {row.questionImg ? (
                    <div className={style.questionImage}>
                      <img src={row.questionImg} alt="card image question" />
                    </div>
                  ) : (
                    row.question
                  )}
                  {/*{row.question.length >= 50 ? row.question.slice(0, 49) + '...' : row.question}*/}
                </SkeletonComponent>{' '}
              </TableCell>
              <TableCell sx={Table_CellStyle}>
                <SkeletonComponent isLoading={isLoading}>
                  {row.answer}
                  {/*{row.answer.length >= 50 ? row.answer.slice(0, 49) + '...' : row.answer}*/}
                </SkeletonComponent>
              </TableCell>
              <TableCell>
                <SkeletonComponent isLoading={isLoading}>
                  {moment(row.updated).format('DD.MM.YYYY')}
                </SkeletonComponent>
              </TableCell>
              <TableCell>
                <SkeletonComponent isLoading={isLoading}>
                  <div className={style.starsRow}>
                    <Rating name="read-only" value={row.grade} readOnly />
                  </div>

                  {userId === createdId ? (
                    <div className={style.editRow}>
                      <span>
                        <CardEditModal
                          questionDomainValue={row.question}
                          answerDomainValue={row.answer}
                          questionImageDomainValue={row.questionImg}
                          saveItem={(item: QuestionItemPropsType) =>
                            updateCardHandler({ ...item, _id: row._id })
                          }
                        />
                        <DeleteCardModal
                          packName={row.question}
                          deleteItem={() => deleteCardHandler(row._id)}
                        />
                      </span>
                    </div>
                  ) : null}
                </SkeletonComponent>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cardsList.length === 0 && !isLoading && (
        <div className={s.tableInfo}>No Results For This Search</div>
      )}
      {cardsList.length === 0 && isLoading && (
        <div className={s.tableInfo}>
          <CircularProgress />
        </div>
      )}
    </TableContainer>
  )
}
