import React, { ChangeEvent, useEffect } from 'react'

import { Grid, Skeleton } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import DefaultPackCover from '../../../assets/images/DefaultPackCover-01.svg'
import { BackToPacksListButton } from '../../../common/components/BackToPacksListButton/BackToPacksListButton'
import {
  CardBasicModal,
  QuestionItemPropsType,
} from '../../../common/components/Modals/CardBasicModal/CardBasicModal'
import { PageTitle } from '../../../common/components/PageTitle/PageTitle'
import { PaginationBlock } from '../../../common/components/Pagination/PaginationBlock'
import { SearchInput } from '../../../common/components/SearchInput/SearchInput'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { useDebounce } from '../../../common/hooks/useDebounce'
import { PATH } from '../../../common/path/path'
import { Card_ButtonStyle, Card_SkeletonStyle } from '../../../common/styles/CardStyles'
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
  selectCardsPackCover,
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
  const deckCover = useAppSelector(selectCardsPackCover)
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
  const debouncedSearchQuestion = useDebounce<string | null>(searchQuestion, 1000)

  const params = useParams() // packId

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

  // card functions
  const addCardHandler = (item: {
    cardsPack_id: string
    question?: string
    answer: string
    questionImg?: string
  }) => {
    dispatch(addCardTC(item))
  }
  const deletePackHandler = (packs_id: string) => {
    dispatch(deletePacksTC(packs_id))
    navigate(PATH.PROFILE.PACKLIST)
  }
  const updatePackHandler = (
    packs_id: string,
    inputValue: string,
    packCoverState: string,
    privateCheckbox: boolean
  ) => {
    dispatch(
      updatePacksTC({
        cardsPack: {
          _id: packs_id,
          name: inputValue,
          deckCover: packCoverState,
          private: privateCheckbox,
        },
      })
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
    <Grid container justifyContent={'center'}>
      <BackToPacksListButton route={PATH.PROFILE.PACKLIST} title={'Back to Packs List'} />
      <div className={s2.packList}>
        <div className={s2.header_row}>
          {userId === createdId ? (
            <Grid display="flex" alignItems="center">
              {initialize && <PageTitle title={packName} />}
              {!initialize && <Skeleton animation="wave" sx={Card_SkeletonStyle}></Skeleton>}

              <CardDottedMenu
                updatePackHandler={updatePackHandler}
                deletePackHandler={deletePackHandler}
                goToLearnHandler={goToLearnHandler}
              />
              <div className={s.deckCover}>
                <img src={deckCover} alt="deckCover" />
              </div>
            </Grid>
          ) : (
            <>
              <div className={s.deckCover_notMy}>
                {initialize && <PageTitle title={packName} />}
                <div className={s.deckCover}>
                  <img src={deckCover ? deckCover : DefaultPackCover} alt="deckCover" />
                </div>
              </div>
              {!initialize && <Skeleton animation="wave" sx={Card_SkeletonStyle}></Skeleton>}
            </>
          )}
          <div className={s2.addNewPackBtn}>
            {userId === createdId ? (
              <CardBasicModal
                headerTitle={'Add New Card'}
                saveItem={(item: QuestionItemPropsType) =>
                  addCardHandler({ ...item, cardsPack_id: cardPackId })
                }
              >
                <Button
                  disabled={isLoading}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                  sx={Card_ButtonStyle}
                >
                  Add New Card
                </Button>
              </CardBasicModal>
            ) : (
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={Card_ButtonStyle}
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
