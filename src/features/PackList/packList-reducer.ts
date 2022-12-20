import { AppThunkType } from '../../app/store'

import { GetPacksResponseType, newPack, packListApi, PacksType } from './packList-api'

const initialState: PackListInitialStateType = {
  initialize: false,
  isLoading: false,
  packList: [],
  sortPacks: '0updated',
  isMy: false,
  min: 0,
  max: 100,
  page: 0,
  cardPacksTotalCount: 0,
  pageCount: 0,
  packName: '',
}

// reducer
export const packListReducer = (
  state: PackListInitialStateType = initialState,
  action: PackListActionType
): PackListInitialStateType => {
  switch (action.type) {
    case 'PACKLIST/SET_LOADING':
      return {
        ...state,
        isLoading: action.value,
      }
    case 'PACKLIST/SET_INITIALIZE':
      return {
        ...state,
        initialize: action.value,
      }
    case 'PACKLIST/SET_INITIALIZE_PACKS':
      return {
        ...state,
        packList: action.packs.cardPacks,
        max: action.packs.maxCardsCount,
        min: action.packs.minCardsCount,
        page: action.packs.page,
        pageCount: action.packs.pageCount,
        cardPacksTotalCount: action.packs.cardPacksTotalCount,
      }
    case 'PACKLIST/SET_PACKS':
      return {
        ...state,
        packList: action.packs.cardPacks,
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
    default:
      return state
  }
}

// actions
export const setLoadingAC = (value: boolean) => ({ type: 'PACKLIST/SET_LOADING', value } as const)
export const setInitializeAC = (value: boolean) =>
  ({ type: 'PACKLIST/SET_INITIALIZE', value } as const)
export const setInitializePacksAC = (packs: GetPacksResponseType) =>
  ({ type: 'PACKLIST/SET_INITIALIZE_PACKS', packs } as const)
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

// thunk
export const initializePacksTC = (): AppThunkType => {
  return dispatch => {
    dispatch(setInitializeAC(true))
    packListApi.getPacks().then(res => {
      dispatch(setInitializeAC(false))
      console.log(res.data)
      dispatch(setInitializePacksAC(res.data))
    })
  }
}
export const getPacksTC = (): AppThunkType => {
  return (dispatch, getState) => {
    const { sortPacks, isMy, max, min, page, pageCount, packName } = getState().packList
    let user_id

    if (isMy) {
      const { _id } = getState().profile

      user_id = _id
    }
    dispatch(setLoadingAC(true))
    packListApi.getPacks({ sortPacks, user_id, max, min, page, pageCount, packName }).then(res => {
      console.log(res.data)
      dispatch(setPacksAC(res.data))
      dispatch(setLoadingAC(false))
    })
  }
}
export const addPacksTC = (cardsPack: newPack): AppThunkType => {
  return dispatch => {
    packListApi.addPacks(cardsPack).then(res => {
      console.log(res.data.cardPacks)
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
    packListApi.delete(idPacks).then(res => {
      console.log(res.data.cardPacks)
      dispatch(getPacksTC())
    })
  }
}

// types
export type PackListActionType =
  | ReturnType<typeof setInitializePacksAC>
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof sortPacksAC>
  | ReturnType<typeof setIsMyAC>
  | ReturnType<typeof setMaxMinAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setLoadingAC>
  | ReturnType<typeof setInitializeAC>
  | ReturnType<typeof setSearchPackNameAC>

export type PackListInitialStateType = {
  initialize: boolean
  isLoading: boolean
  packList: Array<PacksType>
  sortPacks: '0updated' | '1updated'
  isMy: boolean
  min: number
  max: number
  page: number
  cardPacksTotalCount: number
  pageCount: number
  packName: string
}
