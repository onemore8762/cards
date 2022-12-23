import React from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Box, Button, CircularProgress, IconButton, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { SkeletonComponent } from '../../../common/components/Skeleton/Skeleton'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { deletePacksTC, setUpdatePack, updatePacksTC } from '../PackList/packList-reducer'
import {
  selectPackList,
  selectPackListIsLoading,
  selectPackListSortPacks,
} from '../PackList/packListSelectors'

export const PackListTable = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const userId = useAppSelector(selectProfileUserId)
  const packList = useAppSelector(selectPackList)
  const isLoading = useAppSelector(selectPackListIsLoading)
  const sort = useAppSelector(selectPackListSortPacks)

  const handelSortTable = () => {
    if (sort === '0updated') {
      dispatch(setUpdatePack({ sortPacks: '1updated' }))
      searchParams.set('sortPacks', '1updated')
      setSearchParams(searchParams)
    } else {
      dispatch(setUpdatePack({ sortPacks: '0updated' }))
      searchParams.set('sortPacks', '0updated')
      setSearchParams(searchParams)
    }
  }

  const handleUpdatePacks = (idPacks: string) => {
    dispatch(updatePacksTC({ cardsPack: { name: 'Update Packs2', _id: idPacks } }))
  }
  const handleDeletePacks = (idPacks: string) => {
    dispatch(deletePacksTC(idPacks))
  }
  const handelGoCard = (packId: string) => {
    navigate(`/pack/${packId}`)
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '495px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            <TableCell style={{ width: '30%', fontWeight: 'bold', background: '#EFEFEF' }}>
              Name
            </TableCell>
            <TableCell style={{ width: '10%', fontWeight: 'bold', background: '#EFEFEF' }}>
              Cards
            </TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold', background: '#EFEFEF' }}>
              <TableSortLabel
                active
                direction={sort === '0updated' ? 'desc' : 'asc'}
                onClick={handelSortTable}
                disabled={isLoading}
              >
                Last Updated
              </TableSortLabel>
            </TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold', background: '#EFEFEF' }}>
              Created by
            </TableCell>
            <TableCell style={{ width: '20%', fontWeight: 'bold', background: '#EFEFEF' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ minHeight: '300px' }}>
          {packList.map(row => {
            return (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ maxWidth: '250px' }}>
                  <SkeletonComponent isLoading={isLoading}>
                    <Button onClick={() => handelGoCard(row._id)} sx={{ color: 'black' }}>
                      {row.name.length >= 30 ? row.name.slice(0, 29) + '...' : row.name}
                    </Button>
                  </SkeletonComponent>
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
                    <IconButton disabled={row.cardsCount === 0}>
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
          No Results For This Search
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
