import { AppThunkType } from '../../../app/store'
import { packListApi, PacksType } from '../packList-api'

const initialState: PackInitialStateType = {
  pack: {},
  // sortPacks: '0updated',
}

// reducer
export const packReducer = (
  state: PackInitialStateType = initialState,
  action: PackActionType
): PackInitialStateType => {
  // switch (action.type) {
  //   case 'PACKS/GET_PACKS':
  //     return {...state}
  //   default:
  return state
}

// actions
export const getPacksAC = () => ({ type: 'PACKS/GET_PACKS' } as const)

// thunk
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
// types
export type PackInitialStateType = {
  pack: PacksType | {}
  // sortPacks: '0updated' | '1updated'
}
export type PackActionType = ReturnType<typeof getPacksAC>
