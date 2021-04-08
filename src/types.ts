import { WORD_OPTIONAL_MODE } from './constants';

export type SectionPageParams = {
  sector?: string;
  page?: string;
  color?: string;
};

export interface ISpecialSectionPageParams extends SectionPageParams {
  indicator?: string;
  dbRefPage?: string;
}

export interface SectorPage {
  sectorNum: number;
  pageNum: number;
}

export interface SectorPageVisibility extends SectorPage {
  visible: boolean;
}

export interface Page {
  key: number;
  title: string;
  url: string;
  show: boolean;
}

export interface Sector {
  key: number;
  title: string;
  color: string;
  pages: Array<Page>;
}

export type SectorsState = Array<Sector>;

export interface ISpecialSection {
  group: number;
  page: number;
  dbRefPage: number;
  url: string;
}

export type SpecialSections = Array<ISpecialSection>;

export interface IStudiedWordsSection extends SectorPage {
  count: number;
  url: string;
}

export type StudiedWordsSections = Array<IStudiedWordsSection>;

export interface ISectorsInfo {
  sectors: SectorsState;
  sectorsReady: boolean;
  deletedSections: SpecialSections;
  hardSections: SpecialSections;
  studiedWordsSections: StudiedWordsSections;
}

export interface Settings {
  translation: boolean;
  buttons: boolean;
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

const wordOptionalModeValues = Object.values(WORD_OPTIONAL_MODE);
type WordOptionalModeValues = typeof wordOptionalModeValues[number];
export interface IWordOptions {
  mode?: WordOptionalModeValues;
  deleted?: boolean;
}

export interface IDefiniteWordOptions {
  wordId: string;
  options: IWordOptions;
}

export interface IAdditionalUserWordOptions {
  optional: IWordOptions;
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
  optional?: IWordOptions;
  userWord?: IAdditionalUserWordOptions;
}

export type WordsList = Array<IWord>;

export interface IWordsStatus {
  loading: boolean;
  loaded: boolean;
  loadError?: string;
}

export interface IWords extends IWordsStatus {
  data: WordsList;
}

export interface IWordDifficulty {
  wordId: string;
  difficulty: string;
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

export interface MiniGameStats {
  name: string;
  words: number;
  answers: number;
  correctAnswers: number;
  series: number | string;
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

export interface ICreateThunkArguments<T> extends ICredentials {
  obj: Omit<T, 'id'>;
}

export interface IRemoveThunkArguments extends ICredentials {
  id: string;
}

export interface IUpdateThunkArguments<T> extends ICredentials {
  obj: T;
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
}
