import * as t from 'types';

export interface IWordRes {
  wordId: string;
  guessed: number;
  notGuessed: number;
}

export type WordsRes = Array<IWordRes>;

export interface IMyGameStatus {
  gameWords: t.WordsList | null;
  currWord: t.IWord | null;
  enoughWords: boolean;
  newGame: boolean;
  round: number;
  hiddenWord: string | null;
  hiddenLetter: string | null;
  showHiddenLetter: boolean;
  openStartGameModal: boolean;
  userAnswer: t.IWord | null;
  continue: boolean;
  sound: boolean;
}
