import * as t from '../../types';

export interface IWordRes {
  wordId: string;
  guessed: number;
  notGuessed: number;
}

export type WordsRes = Array<IWordRes>;

export interface IMyGameStatus {
  words: t.WordsList;
  enoughWords: boolean;
  newGame: boolean;
  round: number;
  gameWords: t.WordsList;
  guessWord: t.IWord | null;
  hiddenWord: string | null;
  openStartGameModal: boolean;
  gameResults: WordsRes;
  rightWordId: string | null;
  wrongWordId: string | null;
  continue: boolean;
}
