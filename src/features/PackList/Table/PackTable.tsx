import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Box, CircularProgress, IconButton, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'

import { SkeletonComponent } from '../../../common/components/Skeleton/Skeleton'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { Cards } from '../Pack/pack-api'
import { deleteCardTC, sortCardsAC, updateCardTC } from '../Pack/pack-reducer'
import { selectPackUserId, sortCard } from '../Pack/packSelectors'

type packTablePropsType = {
  cardsList: Cards[]
  isLoading: boolean
}

export const PackTable: React.FC<packTablePropsType> = ({ cardsList, isLoading }) => {
  const dispatch = useAppDispatch()
  const sort = useAppSelector(sortCard)
  const userId = useAppSelector(selectProfileUserId)
  const createdId = useAppSelector(selectPackUserId)
  const packId = useAppSelector(selectCardPackId)


  const handelSortTable = () => {
    dispatch(sortCardsAC())
  }
  const handlerUpdateCard = (idCard: string) => {
    dispatch(updateCardTC({ _id: idCard, question: 'new question' }))
  }
  const handleDeleteCard = (idCard: string) => {
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
                onClick={handelSortTable}
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
              <TableCell component="th" scope="row">
                <SkeletonComponent isLoading={isLoading}>{row.question}</SkeletonComponent>{' '}
              </TableCell>
              <TableCell>
                <SkeletonComponent isLoading={isLoading}>{row.answer}</SkeletonComponent>
              </TableCell>
              <TableCell>
                <SkeletonComponent isLoading={isLoading}>
                  {moment(row.updated).format('DD.MM.YYYY')}
                </SkeletonComponent>
              </TableCell>
              <TableCell>
                <SkeletonComponent isLoading={isLoading}>
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
                  {userId === createdId ? (
                    <span>
                      <IconButton onClick={() => handlerUpdateCard(row._id)}>
                        <BorderColorOutlined />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteCard(row._id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </span>
                  ) : null}
                </SkeletonComponent>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cardsList.length === 0 && !isLoading && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}
        >
          No Results For This Search
        </Box>
      )}
      {cardsList.length === 0 && isLoading && (
        <div
          style={{
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      )}
    </TableContainer>
  )
}
