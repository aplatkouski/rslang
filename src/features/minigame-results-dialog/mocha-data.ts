import { IWordStatistic, IGameStatistic } from '../../types';

export interface GameResult {
  current?: {
    data?: unknown;
    wordStatistics: Array<IWordStatistic>;
    gameStatistic: IGameStatistic;
  };
}

export const gameResults: GameResult = {
  current: {
    data: undefined,
    wordStatistics: [
      {
        id: '1',
        wordId: '5e9f5ee35eb9e72bc21afa40',
        gameId: '606744ee4c1b2097c2d7491f',
        group: 0,
        page: 0,
        correctAnswerTotal: 1,
        wrongAnswerTotal: 0,
        studiedAt: new Date().toISOString().substring(0, 10),
      },
      {
        id: '2',
        wordId: '5e9f5ee35eb9e72bc21afa04',
        gameId: '606744ee4c1b2097c2d7491f',
        group: 0,
        page: 0,
        correctAnswerTotal: 1,
        wrongAnswerTotal: 1,
        studiedAt: new Date().toISOString().substring(0, 10),
      },
      {
        id: '3',
        wordId: '5e9f5ee35eb9e72bc21afbf8',
        gameId: '606744ee4c1b2097c2d7491f',
        group: 0,
        page: 0,
        correctAnswerTotal: 1,
        wrongAnswerTotal: 0,
        studiedAt: new Date().toISOString().substring(0, 10),
      },
      {
        id: '4',
        wordId: '5e9f5ee35eb9e72bc21af887',
        gameId: '606744ee4c1b2097c2d7491f',
        group: 0,
        page: 0,
        correctAnswerTotal: 0,
        wrongAnswerTotal: 1,
        studiedAt: new Date().toISOString().substring(0, 10),
      },
      {
        id: '5',
        wordId: '5e9f5ee35eb9e72bc21afaf4',
        gameId: '606744ee4c1b2097c2d7491f',
        group: 0,
        page: 0,
        correctAnswerTotal: 1,
        wrongAnswerTotal: 0,
        studiedAt: new Date().toISOString().substring(0, 10),
      },
    ],
    gameStatistic: {
      id: 'currentId',
      gameId: '606744ee4c1b2097c2d7491f',
      bestSeries: 540,
      date: new Date().toISOString().substring(0, 10),
    },
  },
};
