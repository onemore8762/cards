import React from 'react'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { PackTable } from '../Table/PackTable'

import { packApi } from './pack-api'
import { getCardsListTC } from './pack-reducer'

export const Pack = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <button
        onClick={
          () => dispatch(getCardsListTC('639e269ac7270c4efc6205a4'))
          // packApi
          //   .getCardsList({ cardsPack_id: '639e269ac7270c4efc6205a4' })
          //   .then(res => console.log(res.data))
        }
      >
        Get Data
      </button>
      <PackTable />
    </div>
  )
}
