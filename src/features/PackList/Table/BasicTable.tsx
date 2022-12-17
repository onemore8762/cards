import React, { useEffect } from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
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
import { getPacksTC, sortPacksAC } from '../packList-reducer'
import { selectPackList } from '../packListSelectors'

export const BasicTable = () => {
  const packList = useAppSelector(selectPackList)
  const userId = useAppSelector(state => state.profile._id)
  const sort = useAppSelector(state => state.packList.sortPacks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [sort])
  const handelSortTable = () => dispatch(sortPacksAC())

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            <TableCell>Name</TableCell>
            <TableCell>Cards</TableCell>
            <TableCell>
              <TableSortLabel
                active
                direction={sort === '0updated' ? 'desc' : 'asc'}
                onClick={handelSortTable}
              >
                Last Updated
              </TableSortLabel>
            </TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packList.map(row => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell>{row.cardsCount}</TableCell>
              <TableCell>{moment(row.updated).format('DD.MM.YYYY')}</TableCell>
              <TableCell>{row.user_name}</TableCell>
              <TableCell>
                <IconButton>
                  <SchoolOutlinedIcon />
                </IconButton>
                {row.user_id === userId ? (
                  <span>
                    <IconButton
                    // onClick={handleClickShowPassword}
                    >
                      <BorderColorOutlined />
                    </IconButton>
                    <IconButton
                    // onClick={handleClickShowPassword}
                    >
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
