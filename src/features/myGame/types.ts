export interface IWordRes {
  wordId: string;
  guessed: number;
  notGuessed: number;
}

export type WordsRes = Array<IWordRes>;
