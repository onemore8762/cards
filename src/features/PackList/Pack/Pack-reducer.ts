import { AppThunkType } from '../../../app/store'
import { packListApi, PacksType } from '../packList-api'

const initialState: PackInitialStateType = {
  pack: {},
  // sortPacks: '0updated',
}

export const packReducer = (state = initialState, action: PackActionType) => {
  return state
}

//action
export const getPacksAC = () => ({ type: 'PACKS/GET_PACKS' } as const)
//thunk
export const getPacksTC = (): AppThunkType => {
  return (dispatch, getState) => {
    const { sortPacks } = getState().packList

    packListApi.getPacks({ sortPacks }).then(res => {
      console.log(res.data.cardPacks)

      // @ts-ignore
      dispatch(getPacksListsAC(res.data.cardPacks))
    })
  }
}
// type
export type PackInitialStateType = {
  pack: PacksType | {}
  // sortPacks: '0updated' | '1updated'
}
export type PackActionType = any
