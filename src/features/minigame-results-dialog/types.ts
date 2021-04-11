export interface IWordResult {
  wordID: string;
  isCorrect: boolean;
}
export interface GameResult {
  gameID: string;
  points: number;
  bestSeries: number;
  words: Array<IWordResult>;
}
