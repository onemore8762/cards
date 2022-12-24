import { AxiosError } from 'axios'

import { appSetStatusAC } from '../../app/app-reducer'
import { AppThunkDispatch } from '../../app/store'
import { setErrorAC } from '../../features/Login/login-reducer'

type ErrorResponseData = {
  error: string
}

export const handleServerNetworkError = (
  e: AxiosError<ErrorResponseData, ErrorResponseData>,
  dispatch: AppThunkDispatch
) => {
  const error = e.response ? e.response.data.error : e.message + ', more details in the console'

  dispatch(setErrorAC(error))
  dispatch(appSetStatusAC('failed'))
}

/*export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppThunkDispatch) => {
  if (data.messages) {
    dispatch(setErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setErrorAC({ error: 'Some Error' }))
  }
  dispatch(appSetStatusAC({ status: 'failed' }))
}*/
