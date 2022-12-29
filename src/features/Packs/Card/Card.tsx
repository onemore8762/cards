import React, { ChangeEvent, useEffect, useState } from 'react'

import BorderColorOutlined from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Grid, IconButton, Skeleton } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import { CardBasicModal } from '../../../common/components/Modals/VersionTwo-Work/CardBasicModal/CardBasicModal'
import { DeleteBasicModal } from '../../../common/components/Modals/VersionTwo-Work/DeleteBasicModal/DeleteBasicModal'
import { PackBasicModal } from '../../../common/components/Modals/VersionTwo-Work/PackBasicModal/PackBasicModal'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../../common/components/Pagination/PaginationBlock'
import { SearchInput } from '../../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../common/hooks/useDebounce'
import { PATH } from '../../../common/path/path'
import { selectProfileUserId } from '../../Profile/profileSelectors'
import { deletePacksTC, updatePacksTC } from '../PackList/packList-reducer'
import s2 from '../PackList/PackList.module.css'
import { selectPackList } from '../PackList/packListSelectors'
import { CardTable } from '../Table/CardTable'

import { addCardTC, getCardsListTC, setUpdateCardsAC } from './card-reducer'
import s from './Card.module.css'
import { CardDottedMenu } from './CardDottedMenu'
import {
  selectCardPackId,
  selectCardQuestion,
  selectCardsIsLoading,
  selectCardsList,
  selectCardsPackName,
  selectCardsPage,
  selectCardsPageCount,
  selectCardsTotalCount,
  selectInitialize,
  selectPackUserId,
  selectSortCard,
} from './cardSelectors'

export const Card = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const packList = useAppSelector(selectPackList)
  const userId = useAppSelector(selectProfileUserId)
  const createdId = useAppSelector(selectPackUserId)
  const packName = useAppSelector(selectCardsPackName)
  const cardPackId = useAppSelector(selectCardPackId)
  const cardList = useAppSelector(selectCardsList)
  const isLoading = useAppSelector(selectCardsIsLoading)
  const searchQuestion = useAppSelector(selectCardQuestion)
  const pageCount = useAppSelector(selectCardsPageCount)
  const page = useAppSelector(selectCardsPage)
  const maxPage = useAppSelector(selectCardsTotalCount)
  const initialize = useAppSelector(selectInitialize)
  const sort = useAppSelector(selectSortCard)

  const [searchParams, setSearchParams] = useSearchParams()
  // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const debouncedSearchQuestion = useDebounce<string | null>(searchQuestion, 1000)

  const params = useParams() // packId

  // menu
  /*const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }*/

  // search
  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUpdateCardsAC({ cardQuestion: e.currentTarget.value }))
    if (e.currentTarget.value !== '') {
      searchParams.set('cardQuestion', e.currentTarget.value)
    } else {
      searchParams.delete('cardQuestion')
    }
  }
  const clearSearchInputValueHandler = () => {
    dispatch(setUpdateCardsAC({ cardQuestion: '' }))
    searchParams.delete('cardQuestion')
  }

  // pack flow
  const addCardHandler = (
    questionInputValue: string,
    answerInputValue: string
    // questionType: string
  ) => {
    dispatch(
      addCardTC({
        cardsPack_id: cardPackId,
        question: questionInputValue,
        answer: answerInputValue,
      })
    )
  }
  const deletePackHandler = (packs_id: string) => {
    dispatch(deletePacksTC(packs_id))
    navigate(PATH.PROFILE.PACKLIST)
  }
  const updatePackHandler = (packs_id: string, inputValue: string, privateCheckbox: boolean) => {
    dispatch(
      updatePacksTC({ cardsPack: { _id: packs_id, name: inputValue, private: privateCheckbox } })
    )
  }
  const goToLearnHandler = () => {
    if (params.packId) navigate(`/question/${params.packId}`)
  }

  // pagination
  const changePaginationHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUpdateCardsAC({ pageCount: +event.target.value }))
    searchParams.set('pageCount', event.target.value)
  }
  const changePageHandler = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setUpdateCardsAC({ page: value }))
    searchParams.set('page', `${value}`)
  }

  // render
  useEffect(() => {
    if (initialize) {
      dispatch(getCardsListTC())
      setSearchParams(searchParams)
    }
  }, [sort, pageCount, page, debouncedSearchQuestion, packList])

  useEffect(() => {
    if (!initialize) {
      const cardsQuery = Object.fromEntries(searchParams)

      dispatch(
        setUpdateCardsAC({
          cardQuestion: cardsQuery['cardQuestion'] || '',
          page: +cardsQuery['page'] || 1,
          pageCount: +cardsQuery['pageCount'] || 4,
          packId: params.packId,
        })
      )

      dispatch(getCardsListTC())
    }

    return () => {
      dispatch(setUpdateCardsAC({ initialize: false }))
    }
  }, [])

  return (
    <Grid container justifyContent={'center'} /*s2={{ position: 'relative' }}*/>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <div className={s2.packList}>
        <div className={s2.header_row}>
          {userId === createdId ? (
            <Grid display="flex" alignItems="center">
              {initialize && <PageTitle title={packName} />}
              {!initialize && (
                <Skeleton
                  animation="wave"
                  sx={{ width: '200px', margin: '0', height: '40px' }}
                ></Skeleton>
              )}
              {/*<IconButton onClick={handleOpenUserMenu}>
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
                <PackBasicModal
                  headerTitle={'Edit Pack'}
                  packName={packName}
                  saveItem={(inputValue: string, privateCheckbox: boolean) =>
                    updatePackHandler(cardPackId, inputValue, privateCheckbox)
                  }
                  handleCloseUserMenu={handleCloseUserMenu}
                >
                  <MenuItem>
                    <BorderColorOutlined sx={{ mr: 1 }} />
                    <Typography textAlign="center">Edit</Typography>
                  </MenuItem>
                </PackBasicModal>

                <DeleteBasicModal
                  headerTitle={'Delete Pack'}
                  packName={packName}
                  deleteItem={() => deletePackHandler(cardPackId)}
                  handleCloseUserMenu={handleCloseUserMenu}
                >
                  <MenuItem>
                    <DeleteOutlineIcon sx={{ mr: 1 }} />
                    <Typography textAlign="center">Delete</Typography>
                  </MenuItem>
                </DeleteBasicModal>

                <MenuItem disabled={cardList.length === 0} onClick={goToLearnHandler}>
                  <SchoolOutlinedIcon sx={{ mr: 1 }} />
                  <Typography textAlign="center">Learn</Typography>
                </MenuItem>
              </Menu>*/}
              <CardDottedMenu
                deletePackHandler={deletePackHandler}
                updatePackHandler={updatePackHandler}
                goToLearnHandler={goToLearnHandler}
              />
            </Grid>
          ) : (
            <>
              {initialize && <PageTitle title={packName} />}
              {!initialize && (
                <Skeleton
                  animation="wave"
                  sx={{ width: '200px', margin: '0', height: '40px' }}
                ></Skeleton>
              )}
            </>
          )}

          <div className={s2.addNewPackBtn}>
            {userId === createdId ? (
              <CardBasicModal
                headerTitle={'Add New Card'}
                saveItem={(
                  questionInputValue: string,
                  answerInputValue: string
                  // questionType: string
                ) => addCardHandler(questionInputValue, answerInputValue /*, questionType*/)}
              >
                <Button
                  disabled={isLoading}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                  sx={{
                    width: '175px',
                    borderRadius: '30px',
                  }}
                >
                  Add New Card
                </Button>
              </CardBasicModal>
            ) : (
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{
                  width: '175px',
                  borderRadius: '30px',
                }}
                onClick={goToLearnHandler}
              >
                Learn Pack
              </Button>
            )}
          </div>
        </div>
        <div className={s.searchRow}>
          <div className={s2.column_title}>Search</div>
          <div>
            <SearchInput
              disabled={isLoading}
              search={searchQuestion}
              searchHandler={searchHandler}
              placeholder={'find question'}
              sx={{ width: '100%' }}
              clearInputValue={clearSearchInputValueHandler}
            />
          </div>
        </div>
        <div className={s.mainTable}>
          <CardTable cardsList={cardList} isLoading={isLoading} />
        </div>
        <PaginationBlock
          disabled={isLoading}
          page={page}
          maxPage={maxPage}
          pageCount={pageCount}
          handleChangePage={changePageHandler}
          handleChangePagination={changePaginationHandler}
        />
      </div>
    </Grid>
  )
}
