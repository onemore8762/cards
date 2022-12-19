import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
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
import { deletePacksTC, getPacksTC, sortPacksAC, updatePacksTC } from '../packList-reducer'
import { selectPackList } from '../packListSelectors'

export const BasicTable = () => {
  const packList = useAppSelector(selectPackList)
  const userId = useAppSelector(state => state.profile._id)
  const isLoading = useAppSelector(state => state.packList.isLoading)
  const sort = useAppSelector(state => state.packList.sortPacks)
  const dispatch = useAppDispatch()

  const handelSortTable = () => {
    dispatch(sortPacksAC())
    dispatch(getPacksTC())
  }

  const handleUpdatePacks = (idPacks: string) => {
    dispatch(updatePacksTC({ cardsPack: { name: 'Update Packs2', _id: idPacks } }))
  }
  const handleDeletePacks = (idPacks: string) => {
    dispatch(deletePacksTC(idPacks))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            <TableCell style={{ width: '30%', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell style={{ width: '10%', fontWeight: 'bold' }}>Cards</TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold' }}>
              <TableSortLabel
                active
                direction={sort === '0updated' ? 'desc' : 'asc'}
                onClick={handelSortTable}
              >
                Last Updated
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold' }}>Created by</TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ minHeight: '300px' }}>
          {packList.map(row => {
            return (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <SkeletonComponent isLoading={isLoading}>{row.name}</SkeletonComponent>
                </TableCell>
                <TableCell>
                  <SkeletonComponent isLoading={isLoading}>{row.cardsCount}</SkeletonComponent>
                </TableCell>
                <TableCell>
                  <SkeletonComponent isLoading={isLoading}>
                    {moment(row.updated).format('DD.MM.YYYY')}
                  </SkeletonComponent>
                </TableCell>
                <TableCell>
                  <SkeletonComponent isLoading={isLoading}>{row.user_name}</SkeletonComponent>
                </TableCell>
                <TableCell>
                  <SkeletonComponent isLoading={isLoading}>
                    <IconButton>
                      <SchoolOutlinedIcon />
                    </IconButton>
                    {row.user_id === userId ? (
                      <span>
                        <IconButton onClick={() => handleUpdatePacks(row._id)}>
                          <BorderColorOutlined />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePacks(row._id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </span>
                    ) : null}
                  </SkeletonComponent>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {packList.length === 0 && !isLoading && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}
        >
          There are no such pack
        </Box>
      )}
      {packList.length === 0 && isLoading && (
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
/*{
  isLoading && (
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
  )
}*/
