import { requestStatus } from './constants';

export interface Settings {
  isShowTranslations: boolean;
  isShowButtons: boolean;
}

export interface IRegistrationErrors {
  [general: string]: string | null | undefined;
  email: string | null | undefined;
  name: string | null | undefined;
  password: string | null | undefined;
}

export interface IUser {
  name: string;
  photoSrc?: string;
  refreshToken: string;
  token: string;
  userId: string;
}

export interface IUserLogInData {
  email: string;
  password: string;
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IStatus {
  error?: string;
  status: keyof typeof requestStatus;
}

export interface IUserWord {
  id: string;
  wordId: string;
  isDeleted?: boolean;
  isDifficult?: boolean;
  isStudied?: boolean;
  group: number;
  page: number;
  addedAt?: string; // YYYY-MM-DD
}

export interface Contributor {
  name: string;
  gitHubLink: string;
}

export interface IGame {
  id: string;
  name: string;
  num: number;
  img?: string;
}

export interface IGameStatistic {
  id: string;
  gameId: string;
  bestSeries: number;
  date: string;
}

export interface ICredentials {
  userId: string;
  userToken: string;
}

export interface IWordStatistic {
  id: string;
  wordId: string;
  gameId: string;
  group: number;
  page: number;
  correctAnswerTotal: number;
  wrongAnswerTotal: number;
  studiedAt: string;
}

export interface IRouterPath {
  group: string;
  page: string;
  gameId: string;
}

export interface IChartData {
  studiedAt: string;
  words: number;
}

export interface IWordCountByPages {
  [pageIndex: string]: number;
}

export interface IWordCountByGroupsAndPages {
  [groupNum: string]: {
    [pageNum: string]: number;
    total: number;
  };
}

export interface ISelectProps {
  group: number;
  page: number;
}
