import { IWord } from 'types';

export interface IMyGameStatus {
  gameWords: Array<IWord> | null;
  currWord: IWord | null;
  enoughWords: boolean;
  newGame: boolean;
  round: number;
  waitingForNextRound: boolean;
  hiddenWord: string | null;
  hiddenLetter: string | null;
  showHiddenLetter: boolean;
  openStartGameModal: boolean;
  userAnswer: IWord | null;
  continue: boolean;
  sound: boolean;
}
