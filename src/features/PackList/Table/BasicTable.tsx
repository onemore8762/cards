import React, { useEffect } from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { IconButton } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { getPacksTC } from '../packList-reducer'
import { selectPackList } from '../packListSelectors'

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

type TablePropsType = {
  headerInTable: Array<string>
}

export const BasicTable = (props: TablePropsType) => {
  const dispatch = useAppDispatch()
  const packList = useAppSelector(selectPackList)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#EFEFEF' }}>
            {props.headerInTable.map((nameCell, index) => (
              <TableCell key={index}>{nameCell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {packList.map(row => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell>{row.cardsCount}</TableCell>
              <TableCell>{row.updated}</TableCell>
              <TableCell>{row.user_id}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                >
                  <SchoolOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                >
                  <BorderColorOutlined />
                </IconButton>
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
              {/*<TableCell>{row.carbs}</TableCell>*/}
              {/*<TableCell>{row.protein}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
