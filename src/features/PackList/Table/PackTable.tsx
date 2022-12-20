import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { IconButton, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { Cards } from '../Pack/pack-api'
import { deleteCardTC, updateCardTC } from '../Pack/pack-reducer'
import { selectPackUserId } from '../Pack/packSelectors'
import { sortPacksAC } from '../packList-reducer'
import { selectSortPacks } from '../packListSelectors'

type packTablePropsType = {
  cardsList: Cards[]
}

export const PackTable = (props: packTablePropsType) => {
  const dispatch = useAppDispatch()

  const sort = useAppSelector(selectSortPacks)
  const userId = useAppSelector(selectProfileUserId)
  const createdId = useAppSelector(selectPackUserId)

  // useEffect(() => {
  //   dispatch(getPacksTC())
  // }, [sort])

  const handelSortTable = () => dispatch(sortPacksAC())
  const handlerUpdateCard = (idCard: string) => {
    dispatch(updateCardTC({ _id: idCard, question: 'new question' }))
  }
  const handleDeleteCard = (idCard: string) => {
    dispatch(deleteCardTC(idCard))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            <TableCell style={{ width: '30%', fontWeight: 'bold' }}>Question</TableCell>
            <TableCell style={{ width: '10%', fontWeight: 'bold' }}>Answer</TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold' }}>
              <TableSortLabel
                active
                direction={sort === '0updated' ? 'desc' : 'asc'}
                onClick={handelSortTable}
              >
                Last Updated
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold' }}>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cardsList.map(row => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.question}
              </TableCell>

              <TableCell>{row.answer}</TableCell>
              <TableCell>{moment(row.updated).format('DD.MM.YYYY')}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
