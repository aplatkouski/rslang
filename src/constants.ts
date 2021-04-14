export const PAGES_PER_SECTOR = 30;
export const WORDS_PER_PAGE = 20;
export const WORD_CARD_WIDTH = 320;
export const WORD_CARD_MARGIN = 16;

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

export const LOCALSTORAGE_KEY = 'RSLangUserData';

export const SERVER_OK_STATUS = 200;

export const WRONG_AUTHENTICATION_DATA_MESSAGE = 'Неверный email и/или пароль';
export const WRONG_REGISTRATION_MESSAGE = 'Ошибка регистрации';
export const TRY_REGISTRATION_AGAIN_MESSAGE = 'Проверьте правильность введенных данных';
export const SUCCESSFUL_REGISTRATION_MESSAGE = 'Вы успешно зарегистрированы';

export const WORD_OPTIONAL_MODE = {
  hard: 'hard',
  studied: 'studied',
};

export const VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
export const ROUTES = {
  main: '/',
  sector: '/textbook',
  sections: '/textbook/:sector/:page',
  team: '/about-team',
  statistic: '/statistic',
  mini_games: '/mini_games',
  savanna: '/mini_games/savanna',
  audio_call: '/mini_games/audio_call',
  sprint: '/mini_games/sprint',
  custom_game: '/mini_games/custom_game',
  statistics: '/statistics',
};

export const STATISTIC_KEY = 'stats';

export const GAMES = {
  sprint: 'Спринт',
  audioCall: 'Аудиовызов',
  savanna: 'Саванна',
  ownGame: 'Своя игра',
};

export const GAMES_BY_ID = {
  '606744ff4c1b2097c2d74921': 'Спринт',
  '606744ee4c1b2097c2d7491f': 'Аудиовызов',
  '606744f84c1b2097c2d74920': 'Саванна',
  '606745084c1b2097c2d74922': 'Своя игра',
};

export const GAME_PART_URL_PATH = 'game';

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

export const CHART = {
  DAILY_TITLE: 'Статистика изученных слов за каждый день',
  TOTAL_TITLE: 'Статистика общего числа изученных слов за каждый день',
};
