import React from 'react'

import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { CircularProgress, IconButton, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'

import { CardEditModal } from '../../../common/components/Modals/VersionTwo-Work/CardEditModal/CardEditModal'
import { DeleteCardModal } from '../../../common/components/Modals/VersionTwo-Work/DeleteCardModal/DeleteCardModal'
import { SkeletonComponent } from '../../../common/components/Skeleton/Skeleton'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import s from '../../../common/styles/CommonStyles.module.css'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { Cards } from '../Card/card-api'
import { deleteCardTC, sortCardsAC, updateCardTC } from '../Card/card-reducer'
import { selectPackUserId, selectSortCard } from '../Card/cardSelectors'

import style from './CardTable.module.css'

type packTablePropsType = {
  cardsList: Array<Cards>
  isLoading: boolean
}

export const CardTable: React.FC<packTablePropsType> = ({ cardsList, isLoading }) => {
  const dispatch = useAppDispatch()
  const sort = useAppSelector(selectSortCard)
  const userId = useAppSelector(selectProfileUserId)
  const createdId = useAppSelector(selectPackUserId)

  const sortTableHandler = () => {
    dispatch(sortCardsAC())
  }
  const updateCardHandler = (idCard: string) => {
    dispatch(updateCardTC({ _id: idCard, question: 'new question' }))
  }
  const deleteCardHandler = (idCard: string) => {
    dispatch(deleteCardTC(idCard))
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '450px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            <TableCell style={{ width: '30%', fontWeight: 'bold', background: '#EFEFEF' }}>
              Question
            </TableCell>
            <TableCell style={{ width: '10%', fontWeight: 'bold', background: '#EFEFEF' }}>
              Answer
            </TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold', background: '#EFEFEF' }}>
              <TableSortLabel
                active
                direction={sort === '0updated' ? 'desc' : 'asc'}
                onClick={sortTableHandler}
              >
                Last Updated
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold', background: '#EFEFEF' }}>
              Grade
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsList.map(row => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ maxWidth: '250px' }}>
                <SkeletonComponent isLoading={isLoading}>
                  {row.question.length >= 30 ? row.question.slice(0, 29) + '...' : row.question}
                </SkeletonComponent>{' '}
              </TableCell>
              <TableCell sx={{ maxWidth: '250px' }}>
                <SkeletonComponent isLoading={isLoading}>
                  {row.answer.length >= 30 ? row.answer.slice(0, 29) + '...' : row.answer}
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
                    <IconButton>
                      <StarOutlineIcon />
                    </IconButton>
                    <IconButton>
                      <StarOutlineIcon />
                    </IconButton>
                    <IconButton>
                      <StarOutlineIcon />
                    </IconButton>
                    <IconButton>
                      <StarOutlineIcon />
                    </IconButton>
                    <IconButton>
                      <StarOutlineIcon />
                    </IconButton>
                  </div>

                  {userId === createdId ? (
                    <div className={style.editRow}>
                      <span>
                        <CardEditModal saveItem={() => updateCardHandler(row._id)} />
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
