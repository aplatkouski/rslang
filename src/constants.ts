export const PAGES_PER_SECTOR = 30;
export const WORDS_PER_PAGE = 20;

export const SECTOR_COLORS = [
  '#faedcb',
  '#c9e4de',
  '#c6def1',
  '#dbcdf0',
  '#f2c6de',
  '#f9c6c9',
];

export const DICTIONARY_SECTOR_COLOR = '#e2cfc4';
export const STUDIED_WORDS_SECTOR_COLOR = '#FFE9CE';
export const HARD_WORDS_SECTOR_COLOR = '#FFF1AD';
export const DELETED_WORDS_SECTOR_COLOR = '#FFBE85';

export const api = 'https://rs-lang-server.herokuapp.com';
export const USER_REGISTRATION_API = 'users';
export const LOG_IN_API = 'signin';
export const GET_USER_PHOTO_API = (userId: string) => {
  return `users/${userId}/photo`;
};
export const GET_USER_API = (userId: string) => {
  return `users/${userId}`;
};
export const GET_USER_WORD_API = (userId: string, wordId: string) => {
  return `users/${userId}/words/${wordId}`;
};
export const GET_USER_WORDS_API = (userId: string) => {
  return `users/${userId}/aggregatedWords/fromPage`;
};
export const GET_STUDIED_USER_WORDS_API = (userId: string) => {
  return `users/${userId}/aggregatedWords/studiedFromPage`;
};
export const CREATE_USER_WORDS_API = (userId: string) => {
  return `users/${userId}/aggregatedWords`;
};
export const GET_DELETED_WORDS_STAT = (userId: string) => {
  return `users/${userId}/wordsStat/deletedWordsStat`;
};
export const GET_HARD_WORDS_STAT = (userId: string) => {
  return `users/${userId}/wordsStat/hardWordsStat`;
};
export const GET_STUDIED_WORDS_STAT = (userId: string) => {
  return `users/${userId}/wordsStat/studiedWordsStat`;
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

export const SPECIAL_WORD_INDICATOR = {
  DEL: 'del',
  HARD: 'hard',
};
