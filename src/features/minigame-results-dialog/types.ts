export interface IWordResult {
  wordId: string;
  isCorrect: boolean;
}
export interface GameResult {
  gameId: string;
  points: number | undefined;
  bestSeries: number | undefined;
  words: Array<IWordResult>;
}
