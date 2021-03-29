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
export const GET_WORDS_API = 'words';
export const CREATE_USER_WORD_API = (userId: string, wordId: string) => {
  return `users/${userId}/words/${wordId}`;
};
export const GET_AGGREGATED_WORDS_API = (userId: string) => {
  return `users/${userId}/aggregatedWords`;
};

export const LOCALSTORAGE_KEY = 'RSLangUserData';

export const SERVER_OK_STATUS = 200;

export const WRONG_AUTHENTICATION_DATA_MESSAGE = 'Неверный email и/или пароль';
export const WRONG_REGISTRATION_MESSAGE = 'Ошибка регистрации';
export const TRY_REGISTRATION_AGAIN_MESSAGE = 'Проверьте правильность введенных данных';
export const SUCCESSFUL_REGISTRATION_MESSAGE = 'Вы успешно зарегистрированы';
export const COULD_NOT_GET_WORDS = 'Не удалось получить список слов. Попробуйте снова';

export const WORD_DIFFICULTY = {
  HARD: 'hard',
  EASY: 'easy',
};

export const VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
export const ROUTES = {
  main: '/',
  sector: '/sectors',
  sections: '/section/:sector/:page/:color',
  team: '/about-team',
};
