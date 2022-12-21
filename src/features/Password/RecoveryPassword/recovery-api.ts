import { instance } from '../../../common/api/cards-api'

export const recoveryApi = {
  recovery(email: string) {
    const values = {
      email, // кому восстанавливать пароль
      from: 'test-front-admin',
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/CreateNewPassword/$token$'>
link</a>
</div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    }

    return instance.post('auth/forgot', values)
  },
}
