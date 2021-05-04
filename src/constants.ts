export const PAGES_PER_GROUP = 30;
export const WORDS_PER_PAGE = 20;
export const WORD_CARD_WIDTH = 320;
export const WORD_CARD_MARGIN = 16;
export const GROUP_COUNT = 6;

export const api = 'https://rs-lang-server.herokuapp.com';
export const USER_REGISTRATION_API = 'users';
export const LOG_IN_API = 'signin';

export const GET_USER_PHOTO_API = (userId: string) => {
  return `users/${userId}/photo`;
};

export const GET_USER_API = (userId: string) => {
  return `users/${userId}`;
};

export const LOCALSTORAGE_KEY = 'RSLangUserData';

export const SERVER_OK_STATUS = 200;

export const WRONG_AUTHENTICATION_DATA_MESSAGE = 'Неверный email и/или пароль';
export const WRONG_REGISTRATION_MESSAGE = 'Ошибка регистрации';
export const TRY_REGISTRATION_AGAIN_MESSAGE = 'Проверьте правильность введенных данных';
export const SUCCESSFUL_REGISTRATION_MESSAGE = 'Вы успешно зарегистрированы';

export const VIDEO_URL = 'https://www.youtube.com/watch?v=cOvFE0yx2mc';

export const ROUTES = {
  deleted: {
    url: '/textbook/dictionary/deleted',
    title: 'Удаленные слова',
  },
  difficult: {
    url: '/textbook/dictionary/difficult',
    title: 'Сложные слова',
  },
  main: {
    url: '/',
    title: 'Главная страница',
  },
  games: {
    url: '/games',
    title: 'Игры',
  },
  textbook: {
    url: '/textbook',
    title: 'Учебник',
  },
  statistics: {
    url: '/statistics',
    title: 'Статистика',
  },
  studied: {
    url: '/textbook/dictionary/studied',
    title: 'Изучаемые слова',
  },
  aboutTeam: {
    url: '/about-team',
    title: 'О команде',
  },
};

export const requestStatus = {
  idle: 'idle' as const,
  fulfilled: 'fulfilled' as const,
  pending: 'pending' as const,
  rejected: 'rejected' as const,
};

export const requestMethods = {
  GET: 'GET' as const,
  POST: 'POST' as const,
  PUT: 'PUT' as const,
  DELETE: 'DELETE' as const,
};
