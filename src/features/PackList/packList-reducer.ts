import { AppThunkType } from '../../app/store'

import { GetPacksResponseType, newPack, packListApi, PacksType } from './packList-api'

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
    case 'PACKLIST/SORT_PACKS':
      if (state.sortPacks === '0updated') {
        return { ...state, sortPacks: '1updated' }
      } else {
        return { ...state, sortPacks: '0updated' }
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
export const sortPacksAC = () => ({ type: 'PACKLIST/SORT_PACKS' } as const)
// -------------------------------------------------------------------
export const setUpdatePack = (payload: UpdatePack) =>
  ({ type: 'PACKLIST/UPDATE_PACK', payload } as const)

// thunk
export const getPacksTC = (isMyQuery?: boolean): AppThunkType => {
  return (dispatch, getState) => {
    const { sortPacks, page, pageCount, packName, isMy, max, min } = getState().packList
    const { _id } = getState().profile

    let user_id

    if (isMy || isMyQuery) {
      user_id = _id
    }
    dispatch(setUpdatePack({ isLoading: true }))
    packListApi
      .getPacks({ sortPacks, user_id, max, min, page, pageCount, packName })
      .then(res => {
        dispatch(setPacksAC(res.data))
        dispatch(
          setUpdatePack({
            isLoading: false,
          })
        )
      })
      .finally(() => {
        dispatch(setUpdatePack({ initialize: true }))
      })
  }
}

export const addPacksTC = (cardsPack: newPack): AppThunkType => {
  return dispatch => {
    packListApi.addPacks(cardsPack).then(() => {
      dispatch(getPacksTC())
    })
  }
}
export const updatePacksTC = (cardsPack: newPack): AppThunkType => {
  return dispatch => {
    packListApi.update(cardsPack).then(() => {
      dispatch(getPacksTC())
    })
  }
}
export const deletePacksTC = (idPacks: string): AppThunkType => {
  return dispatch => {
    packListApi.delete(idPacks).then(() => {
      dispatch(getPacksTC())
    })
  }
}

// types
export type PackListActionType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof sortPacksAC>
  | ReturnType<typeof setUpdatePack>

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
