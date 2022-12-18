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
    default:
      return state
  }
}

// actions
export const setInitializePacksAC = (packs: GetPacksResponseType) =>
  ({ type: 'PACKLIST/SET_INITIALIZE_PACKS', packs } as const)
export const setLoading = (value: boolean) => ({ type: 'PACKLIST/SET_LOADING', value } as const)
export const setInitialize = (value: boolean) =>
  ({ type: 'PACKLIST/SET_INITIALIZE', value } as const)
export const setPacksAC = (packs: GetPacksResponseType) =>
  ({ type: 'PACKLIST/SET_PACKS', packs } as const)
export const sortPacksAC = () => ({ type: 'PACKLIST/SORT_PACKS' } as const)
export const setIsMy = (isMy: boolean) => ({ type: 'PACKLIST/SET_IS_MY', isMy: isMy } as const)
export const setMaxMin = (min: number, max: number) =>
  ({ type: 'PACKLIST/SET_MAX_MIN', min, max } as const)
export const setPage = (page: number) => ({ type: 'PACKLIST/SET_PAGE', page } as const)
export const setPageCount = (pageCount: number) =>
  ({ type: 'PACKLIST/SET_PAGE_COUNT', pageCount } as const)
// thunk
export const initializePacksTC = (): AppThunkType => {
  return dispatch => {
    dispatch(setInitialize(true))
    packListApi.getPacks().then(res => {
      dispatch(setInitialize(false))
      console.log(res.data)
      // @ts-ignore
      dispatch(setInitializePacksAC(res.data))
    })
  }
}

export const getPacksTC = (): AppThunkType => {
  return (dispatch, getState) => {
    const { sortPacks, isMy, max, min, page, pageCount } = getState().packList
    let user_id

    if (isMy) {
      const { _id } = getState().profile

      user_id = _id
    }
    dispatch(setLoading(true))
    packListApi.getPacks({ sortPacks, user_id, max, min, page, pageCount }).then(res => {
      console.log(res.data)
      // @ts-ignore
      dispatch(setPacksAC(res.data))
      dispatch(setLoading(false))
    })
  }
}
export const addPacksTC = (cardsPack: newPack): AppThunkType => {
  return dispatch => {
    packListApi.addPacks(cardsPack).then(res => {
      console.log(res.data.cardPacks)
      // @ts-ignore
      dispatch(getPacksTC())
    })
  }
}

// types
export type PackListActionType =
  | ReturnType<typeof setInitializePacksAC>
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof sortPacksAC>
  | ReturnType<typeof setIsMy>
  | ReturnType<typeof setMaxMin>
  | ReturnType<typeof setPage>
  | ReturnType<typeof setPageCount>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setInitialize>
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
}
