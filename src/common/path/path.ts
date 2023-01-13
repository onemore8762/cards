export const PATH = {
  LOGIN: {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    RECOVERY_PASSWORD: '/recoveryPassword',
    CREATE_NEW_PASSWORD: '/createNewPassword/:token',
    CHECK_EMAIL: '/checkEmail',
  },
  PROFILE: {
    PROFILE: '/profile',
    PACKLIST: '/packs',
    CARD: '/packs/:packId',
  },
  LEARN: {
    QUESTION: '/question/:packId',
  },
  COMMON: {
    ERROR404: '/error404',
  },
}
