import { AxiosError } from 'axios'

import { appSetStatusAC } from '../../app/app-reducer'
import { AppThunkDispatch } from '../../app/store'
import { setErrorAC } from '../../features/Login/login-reducer'

export const handleServerNetworkError = (
  e: AxiosError<ErrorResponseData, ErrorResponseData>,
  dispatch: AppThunkDispatch
) => {
  const error = e.response ? e.response.data.error : e.message + ', more details in the console'

  dispatch(setErrorAC(error))
  dispatch(appSetStatusAC('failed'))
}

type ErrorResponseData = {
  error: string
}
