import { AppThunkType } from '../../app/store'

import { GetPacksResponseType, newPack, packListApi, PacksType } from './packList-api'

const initialState: PackListInitialStateType = {
  initialize: false,
  isLoading: false,
  cardPacks: [],
  sortPacks: '0updated',
  isMy: false,
  min: 0,
  max: 100,
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
    case 'PACKLIST/SET_IS_MY':
      return { ...state, isMy: action.isMy }
    case 'PACKLIST/SET_MAX_MIN':
      return { ...state, min: action.min, max: action.max }
    case 'PACKLIST/SET_PAGE':
      return { ...state, page: action.page }
    case 'PACKLIST/SET_PAGE_COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'PACKLIST/SET_SEARCH_PACK-NAME':
      return { ...state, packName: action.packName }
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
export const setIsMyAC = (isMy: boolean) => ({ type: 'PACKLIST/SET_IS_MY', isMy } as const)
export const setMaxMinAC = (min: number, max: number) =>
  ({ type: 'PACKLIST/SET_MAX_MIN', min, max } as const)
export const setPageAC = (page: number) => ({ type: 'PACKLIST/SET_PAGE', page } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'PACKLIST/SET_PAGE_COUNT', pageCount } as const)
export const setSearchPackNameAC = (packName: string) =>
  ({ type: 'PACKLIST/SET_SEARCH_PACK-NAME', packName } as const)

// -------------------------------------------------------------------
export const setUpdatePack = (payload: UpdatePack) =>
  ({ type: 'PACKLIST/UPDATE_PACK', payload } as const)

type UpdatePack = {
  isLoading?: boolean
  initialize?: boolean
  packs?: GetPacksResponseType
  isMy?: boolean
  min?: number
  max?: number
  page?: number
  pageCount?: number
  packName?: string
}
// -------------------------------------------------------------------

// thunk
export const getPacksTC = (): AppThunkType => {
  return (dispatch, getState) => {
    const { sortPacks, isMy, page, pageCount, packName, max, min } = getState().packList
    let user_id

    if (isMy) {
      const { _id } = getState().profile

      user_id = _id
    }
    dispatch(setUpdatePack({ isLoading: true }))
    packListApi
      .getPacks({ sortPacks, user_id, max, min, page, pageCount, packName })
      .then(res => {
        dispatch(setPacksAC(res.data))
        dispatch(setUpdatePack({ isLoading: false }))
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
  | ReturnType<typeof setIsMyAC>
  | ReturnType<typeof setMaxMinAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setSearchPackNameAC>
  | ReturnType<typeof setUpdatePack>

export type PackListInitialStateType = {
  initialize: boolean
  isLoading: boolean
  cardPacks: Array<PacksType>
  maxCardsCount: number
  minCardsCount: number
  sortPacks: '0updated' | '1updated'
  isMy: boolean
  min: number
  max: number
  page: number
  cardPacksTotalCount: number
  pageCount: number
  packName: string
}
