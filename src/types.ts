export type SectionPageParams = {
  sector?: string;
  page?: string;
  color?: string;
};

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

export interface ILoginErrors {
  errLogInMessage: string | null | undefined;
}

export interface ILoginStatus {
  inProgress: boolean;
}

export interface IUser {
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  photoSrc: string;
}

export interface IUserLogInData {
  email: string;
  password: string;
}

export interface IWordOptions {
  mode: string; // "studied" - изучаемое, "hard" - трудное
  deleted: boolean;
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
  optional: IWordOptions;
  userWord?: IAdditionalUserWordOptions;
}

export type WordsList = Array<IWord>;

export interface IWords {
  data: WordsList;
  loading: boolean;
  loadError?: string;
}

export interface IWordDifficulty {
  wordId: string;
  difficulty: string;
}

export interface ISectionsDeletedWords {
  group: number;
  page: number;
  deletedWordsCount: number;
}
