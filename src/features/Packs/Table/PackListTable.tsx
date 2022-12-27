import React from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Button, CircularProgress, IconButton, TableSortLabel } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { DeleteBasicModal } from '../../../common/components/Modals/VersionTwo-Work/DeleteBasicModal/DeleteBasicModal'
import { PackEditModal } from '../../../common/components/Modals/VersionTwo-Work/PackEditModal/PackEditModal'
import { SkeletonComponent } from '../../../common/components/Skeleton/Skeleton'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import s2 from '../../../common/styles/CommonStyles.module.css'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { deletePacksTC, setUpdatePackAC, updatePacksTC } from '../PackList/packList-reducer'
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

  const sortTableHandler = () => {
    if (sort === '0updated') {
      dispatch(setUpdatePackAC({ sortPacks: '1updated' }))
      searchParams.set('sortPacks', '1updated')
      setSearchParams(searchParams)
    } else {
      dispatch(setUpdatePackAC({ sortPacks: '0updated' }))
      searchParams.set('sortPacks', '0updated')
      setSearchParams(searchParams)
    }
  }

  const updatePackHandler = (packs_id: string, inputValue: string, privateCheckbox: boolean) => {
    dispatch(
      updatePacksTC({ cardsPack: { _id: packs_id, name: inputValue, private: privateCheckbox } })
    )
  }
  const deletePackHandler = (packs_id: string) => {
    dispatch(deletePacksTC(packs_id))
  }
  const goCardHandler = (packId: string) => {
    navigate(`/packs/${packId}`)
  }
  const goToLearnHandler = (packId: string) => {
    navigate(`/question/${packId}`)
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
                onClick={sortTableHandler}
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
                    <Button onClick={() => goCardHandler(row._id)} sx={{ color: 'black' }}>
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
                    <IconButton
                      disabled={row.cardsCount === 0}
                      onClick={() => goToLearnHandler(row._id)}
                    >
                      <SchoolOutlinedIcon />
                    </IconButton>
                    {row.user_id === userId ? (
                      <span>
                        <PackEditModal
                          packName={row.name}
                          saveItem={(inputValue: string, privateCheckbox: boolean) =>
                            updatePackHandler(row._id, inputValue, privateCheckbox)
                          }
                        />

                        <DeleteBasicModal
                          headerTitle={'Delete Pack'}
                          packName={row.name}
                          deleteItem={() => deletePackHandler(row._id)}
                        >
                          <IconButton>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </DeleteBasicModal>
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
        <div className={s2.tableInfo}>No Results For This Search</div>
      )}
      {packList.length === 0 && isLoading && (
        <div className={s2.tableInfo}>
          <CircularProgress />
        </div>
      )}
    </TableContainer>
  )
}
