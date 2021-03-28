export const PAGES_PER_SECTOR = 30;

export const SECTOR_COLORS = [
  '#D7F1B5',
  '#98CAB7',
  '#FFD3BF',
  '#E7ADC6',
  '#B59AC9',
  '#FFFDBF',
];

export const api = 'https://rs-lang-server.herokuapp.com';
export const USER_REGISTRATION_API = 'users';
export const LOG_IN_API = 'signin';
export const GET_USER_PHOTO_API = (userId: string) => {
  return `users/${userId}/photo`;
};

export const LOCALSTORAGE_KEY = 'RSLangUserData';

export const SERVER_OK_STATUS = 200;

export const WRONG_AUTHENTICATION_DATA_MESSAGE = 'Неверный email и/или пароль';
export const WRONG_REGISTRATION_MESSAGE = 'Ошибка регистрации';
export const TRY_REGISTRATION_AGAIN_MESSAGE = 'Проверьте правильность введенных данных';
export const SUCCESSFUL_REGISTRATION_MESSAGE = 'Вы успешно зарегистрированы';
