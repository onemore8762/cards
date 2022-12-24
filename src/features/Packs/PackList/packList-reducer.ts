import { AppThunkType } from '../../../app/store'
import { handleServerNetworkError } from '../../../common/utils/errorUtils'

import { GetPacksResponseType, NewPackType, packListApi, PacksType } from './packList-api'

const initialState: PackListInitialStateType = {
  initialize: false,
  isLoading: false,
  cardPacks: [],
  sortPacks: '0updated',
  isMy: false,
  min: null,
  max: null,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 0,
  packName: '',
}

// reducer
export const packListReducer = (
  state: PackListInitialStateType = initialState,
  action: PackListActionType
): PackListInitialStateType => {
  switch (action.type) {
    case 'PACKLIST/SET_PACKS':
      return {
        ...state,
        cardPacks: action.packs.cardPacks,
        maxCardsCount: action.packs.maxCardsCount,
        minCardsCount: action.packs.minCardsCount,
        cardPacksTotalCount: action.packs.cardPacksTotalCount,
      }
    case 'PACKLIST/UPDATE_PACK':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// actions
export const setPacksAC = (packs: GetPacksResponseType) =>
  ({ type: 'PACKLIST/SET_PACKS', packs } as const)
export const setUpdatePackAC = (payload: UpdatePack) =>
  ({ type: 'PACKLIST/UPDATE_PACK', payload } as const)

// thunks
export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
  const { sortPacks, page, pageCount, packName, isMy, max, min } = getState().packList
  const { _id } = getState().profile

  let user_id

  isMy && (user_id = _id)

  dispatch(setUpdatePackAC({ isLoading: true }))

  try {
    let promise = await packListApi.getPacks({
      sortPacks,
      page,
      pageCount,
      packName,
      max,
      min,
      user_id,
    })

    dispatch(setPacksAC(promise.data))
  } catch (e) {
    // handleServerNetworkError(e, dispatch)
    console.log(e)
  } finally {
    dispatch(setUpdatePackAC({ isLoading: false }))
    dispatch(setUpdatePackAC({ initialize: true }))
  }
}

export const addPacksTC =
  (cardsPack: NewPackType): AppThunkType =>
  dispatch => {
    packListApi
      .addPacks(cardsPack)
      .then(() => {
        dispatch(getPacksTC())
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const updatePacksTC =
  (cardsPack: NewPackType): AppThunkType =>
  dispatch => {
    packListApi
      .update(cardsPack)
      .then(() => {
        dispatch(getPacksTC())
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const deletePacksTC =
  (packs_id: string): AppThunkType =>
  dispatch => {
    packListApi
      .delete(packs_id)
      .then(() => {
        dispatch(getPacksTC())
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch)
      })
  }

// types
export type PackListActionType = ReturnType<typeof setPacksAC> | ReturnType<typeof setUpdatePackAC>

export type PackListInitialStateType = {
  initialize: boolean
  isLoading: boolean
  cardPacks: Array<PacksType>
  maxCardsCount: number
  minCardsCount: number
  sortPacks: '0updated' | '1updated'
  isMy: boolean
  min: number | null
  max: number | null
  page: number
  cardPacksTotalCount: number
  pageCount: number
  packName: string
}

type UpdatePack = {
  isLoading?: boolean
  initialize?: boolean
  packs?: GetPacksResponseType
  isMy?: boolean
  min?: number | null
  max?: number | null
  page?: number
  pageCount?: number
  packName?: string
  sortPacks?: '0updated' | '1updated'
}
