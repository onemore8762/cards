import { ChangeEvent } from 'react'

// загрузка файла
export const uploadHandler = (
  e: ChangeEvent<HTMLInputElement>,
  setFunction: (file64: string) => void,
  extraFunction?: (file64: string) => void
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]

    // console.log('file: ', file)

    if (file.size < 4000000) {
      convertFileToBase64(file, (file64: string) => {
        // console.log(file64)
        setFunction(file64)
        if (extraFunction) {
          extraFunction(file64)
        }
      })
    } else {
      // console.error('Error: ', 'Файл слишком большого размера')
      console.error('Error: ', 'File size is too large')
    }
  }
}

// конвертация файла в base64
export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()

  reader.onloadend = () => {
    const file64 = reader.result as string

    callBack(file64)
  }
  reader.readAsDataURL(file)
}

// функция обработки ошибки файла
export const imageErrorHandler = (callback: (isBroken: boolean) => void) => {
  callback(true)
  console.log('Image file is damaged')
  // alert('Файл с изображением повреждён')
}

// функция, чтобы при загрузке изображения оно отображалась сразу
// domainValue - значение с сервера (если оно есть)
// currentValue - текущее значение (при выборе)
// defaultValue - стандартное значение (из файла)
export const showFileAfterUploading = (
  domainValue: string | undefined,
  currentValue: string | undefined,
  defaultValue: string
) => {
  if (domainValue) {
    if (currentValue === defaultValue) {
      return domainValue
    } else {
      return currentValue
    }
  } else {
    return currentValue
  }
}
