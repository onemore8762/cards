import React, { ChangeEvent, useEffect, useState } from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Grid, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../../common/components/Pagination/PaginationBlock'
import { SearchInput } from '../../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../common/hooks/useDebounce'
import { PATH } from '../../../common/path/path'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import style from '../PackList.module.css'
import { PackTable } from '../Table/PackTable'

import {
  addCardTC,
  getCardsListTC,
  setPageCardsAC,
  setPageCountCardsAC,
  setSearchQuestionAC,
} from './pack-reducer'
import s from './Pack.module.css'
import {
  selectCardPackId,
  selectCardQuestion,
  selectCardsIsLoading,
  selectCardsList,
  selectCardsPackName,
  selectPackUserId,
} from './packSelectors'

export const Pack = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectProfileUserId)
  const createdId = useAppSelector(selectPackUserId)
  const packName = useAppSelector(selectCardsPackName)
  const cardPackId = useAppSelector(selectCardPackId)
  const cardList = useAppSelector(selectCardsList)
  const isLoading = useAppSelector(selectCardsIsLoading)
  const searchQuestion = useAppSelector(selectCardQuestion)
  const debouncedSearchQuestion = useDebounce<string>(searchQuestion, 1000)
  const pageCount = useAppSelector(state => state.pack.pageCount)
  const page = useAppSelector(state => state.pack.page)
  const maxPage = useAppSelector(state => state.pack.cardsTotalCount)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuestionAC(e.currentTarget.value))
  }

  const handlerAddCard = () => {
    dispatch(addCardTC({ cardsPack_id: cardPackId }))
  }

  const handleChangePagination = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPageCountCardsAC(+event.target.value))
    dispatch(getCardsListTC(cardPackId))
  }

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setPageCardsAC(value))
    dispatch(getCardsListTC(cardPackId))
  }

  useEffect(() => {
    if (searchQuestion) {
      dispatch(getCardsListTC(cardPackId))
    }
  }, [debouncedSearchQuestion])

  useEffect(() => {
    if (cardPackId) {
      dispatch(getCardsListTC(cardPackId))
    }
  }, [cardPackId])

  return (
    <Grid container justifyContent={'center'} /*style={{ position: 'relative' }}*/>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <div className={style.packList}>
        <div className={style.header_row}>
          {userId === createdId ? (
            <Grid display="flex" alignItems="center">
              <PageTitle title={packName} />
              <IconButton onClick={handleOpenUserMenu}>
                <MoreVertIcon
                  sx={{ border: '1px solid black', borderRadius: '50px', color: 'black' }}
                />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <BorderColorOutlined sx={{ mr: 1 }} />
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem>
                  <DeleteOutlineIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
                <MenuItem disabled={cardList.length === 0}>
                  <SchoolOutlinedIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Learn</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          ) : (
            <PageTitle title={packName} />
          )}

          <div className={style.addNewPackBtn}>
            {userId === createdId ? (
              <Button
                // disabled={isLoading}
                onClick={handlerAddCard}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{
                  width: '175px',
                  borderRadius: '30px',
                }}
              >
                Add new card
              </Button>
            ) : (
              <Button
                // disabled={isLoading}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{
                  width: '175px',
                  borderRadius: '30px',
                }}
              >
                Learn to pack
              </Button>
            )}
          </div>
        </div>
        <div className={s.searchRow}>
          <div className={style.column_title}>Search</div>
          <div>
            <SearchInput
              disabled={isLoading}
              search={searchQuestion}
              searchHandler={searchHandler}
              placeholder={'find question'}
              sx={{ width: '100%' }}
            />
          </div>
        </div>
        <PackTable cardsList={cardList} isLoading={isLoading} />
        <PaginationBlock
          disabled={isLoading}
          page={page}
          maxPage={maxPage}
          pageCount={pageCount}
          handleChangePage={handleChangePage}
          handleChangePagination={handleChangePagination}
        />
      </div>
    </Grid>
  )
}
