import React from 'react'

import { Skeleton } from '@mui/material'

export const SkeletonComponent = ({ children, isLoading }: any) => {
  return isLoading ? (
    <Skeleton animation="wave" sx={{ width: '100%', margin: '0', height: '40px' }}></Skeleton>
  ) : (
    children
  )
}
