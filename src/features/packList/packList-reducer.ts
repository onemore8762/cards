import { AppThunkType } from '../../app/store'

import { packListApi, PacksType } from './packList-api'

const initialState: packListInitialStateType = {
  packList: [],
}

// reducer
export const packListReducer = (
  state = initialState,
  action: packListActionType
): packListInitialStateType => {
  switch (action.type) {
    case 'GET-PACKS':
      return { ...state, packList: action.packs }
    default:
      return state
  }
}

//action
const getPacksAC = (packs: Array<PacksType>) => ({ type: 'GET-PACKS', packs } as const)

//thunk
export const getPacksTC = (): AppThunkType => {
  return dispatch => {
    packListApi.getPacks().then(res => {
      console.log(res.data.cardPacks)

      // @ts-ignore
      dispatch(getPacksAC(res.data.cardPacks))
    })
  }
}
//type
type packListActionType = ReturnType<typeof getPacksAC>
type packListInitialStateType = {
  packList: PacksType[]
}
