import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import {
  saveNewGameStatistic,
  selectAllGameStatistics,
  updateGameStatistic,
} from 'features/game-statistics/gameStatisticsSlice';
import {
  selectUserWordByWordId,
  upsertUserWord,
} from 'features/user-words/userWordsSlice';
import extractUserWord from 'features/word-card/utils/extract-user-word';
import {
  saveNewWordStatistic,
  selectAllWordStatistics,
  updateWordStatistic,
} from 'features/word-statistics/wordStatisticsSlice';
import { IGame, IGameStatistic, IStatus, IWord, IWordStatistic } from 'types';
import { api, requestStatus } from '../../constants';

const name = 'games' as const;

const gameStatisticsAdapter = createEntityAdapter<IGame>({
  sortComparer: (a, b) => a.num - b.num,
});

interface State extends IStatus {
  current?: {
    currentWord?: IWord;
    choice?: IWord;
    data?: unknown;
    gameStatistic: Omit<IGameStatistic, 'id'>;
    wordStatistics: Array<Omit<IWordStatistic, 'id'>>;
    words: Array<IWord>;
  };
}

const initialState: State = {
  status: requestStatus.idle,
};

export const fetchGames = createAsyncThunk<
  Array<IGame>,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/fetch`,
  async () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    const response = await fetch(`${api}/games`, options);
    return (await response.json()) as Array<IGame>;
  },
  {
    condition: (_: unknown, { getState }) =>
      getState()[name].status === requestStatus.idle,
  }
);

export const upsertGameStatistic = createAsyncThunk<
  void,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/upsertGameStatistic`,
  async (_, { dispatch, getState }) => {
    const state = getState();
    const game = state[name];
    const currentStat = game.current!.gameStatistic;
    const gameStatistics = selectAllGameStatistics(state);
    const existingStat = gameStatistics.find(
      (stat) =>
        stat.gameId === currentStat.gameId &&
        stat.date.localeCompare(currentStat.date) === 0
    );
    // ??
    if (existingStat && existingStat.bestSeries < currentStat.bestSeries) {
      dispatch(updateGameStatistic({ ...existingStat, ...currentStat }));
    } else {
      dispatch(saveNewGameStatistic(currentStat));
    }
  },
  {
    condition: (_, { getState }) => {
      const game = getState()[name];
      return Boolean(game.current && game.current.gameStatistic);
    },
  }
);

export const upsertWordStatistics = createAsyncThunk<
  void,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/upsertWordStatistics`,
  async (_, { dispatch, getState }) => {
    const state = getState();
    const game = state[name];
    const currentStats = game.current!.wordStatistics;
    const wordStatistics = selectAllWordStatistics(state);
    currentStats.forEach((currentStat) => {
      const existingStat = wordStatistics.find(
        (stat) =>
          stat.gameId === currentStat.gameId &&
          stat.studiedAt.localeCompare(currentStat.studiedAt) === 0 &&
          stat.wordId === currentStat.wordId
      );
      if (existingStat) {
        dispatch(
          updateWordStatistic({
            ...existingStat,
            correctAnswerTotal:
              existingStat.correctAnswerTotal + currentStat.correctAnswerTotal,
            wrongAnswerTotal:
              existingStat.wrongAnswerTotal + currentStat.wrongAnswerTotal,
          })
        );
      } else {
        dispatch(saveNewWordStatistic(currentStat));
      }
    });
  },
  {
    condition: (_, { getState }) => {
      const game = getState()[name];
      return Boolean(game.current && game.current.gameStatistic);
    },
  }
);

export const upsertAllStatistic = createAsyncThunk<
  void,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/upsertAllStatistic`, async (_, { dispatch }) => {
  await dispatch(upsertGameStatistic(null));
  await dispatch(upsertWordStatistics(null));
});

interface ResponseData {
  correctAnswerTotal: number;
  wrongAnswerTotal: number;
  studiedAt: string;
}

export const processResponse = createAsyncThunk<
  void,
  ResponseData,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/processResponse`, async (responseData, { dispatch, getState }) => {
  const rootState = getState();
  const currentGame = rootState[name].current;
  if (currentGame && currentGame.currentWord) {
    const { currentWord } = currentGame;
    const userWord = selectUserWordByWordId(getState(), { wordId: currentWord.id });

    const isDeleted = userWord && userWord.isDeleted;

    // if it wasn't marked as studied, do so;
    // if word was deleted, skip it
    if (!userWord || (userWord && !isDeleted && !userWord.isStudied)) {
      await dispatch(
        upsertUserWord({
          ...extractUserWord(currentWord, userWord),
          addedAt: new Date().toISOString().substring(0, 10),
          isStudied: true,
        })
      );
    }

    await dispatch(response({ ...responseData, isDeleted }));
  }
});

const gamesSlice = createSlice({
  name,
  initialState: gameStatisticsAdapter.getInitialState(initialState),
  reducers: {
    startNewGame(
      state,
      {
        payload: { date, gameId, words },
      }: PayloadAction<{ date: string; gameId: string; words: Array<IWord> }>
    ) {
      state.current = {
        gameStatistic: {
          bestSeries: 0,
          date,
          gameId,
        },
        currentWord: words[0], // pick first word
        words: words.slice(1),
        wordStatistics: [] as Array<IWordStatistic>,
      };
    },
    pickWord(state) {
      if (state.current) {
        state.current.currentWord = state.current.words.pop();
        state.current.choice = undefined;
        state.current.gameStatistic.bestSeries = 0;
      }
    },
    choose(state, { payload: choice }: PayloadAction<IWord>) {
      if (state.current) {
        state.current.choice = choice;
      }
    },
    response(
      state,
      {
        payload: { correctAnswerTotal, isDeleted, studiedAt, wrongAnswerTotal },
      }: PayloadAction<ResponseData & { isDeleted?: boolean }>
    ) {
      if (state.current) {
        const { currentWord, wordStatistics } = state.current;
        // skip deleted word
        if (currentWord && !isDeleted) {
          const statistic = wordStatistics.find(
            (wordStatistic) => wordStatistic.wordId === currentWord.id
          );

          if (statistic) {
            statistic.correctAnswerTotal += correctAnswerTotal;
            statistic.wrongAnswerTotal += wrongAnswerTotal;
          } else {
            const { id: wordId, group, page } = currentWord;
            wordStatistics.push({
              wordId,
              gameId: state.current.gameStatistic.gameId,
              group,
              page,
              correctAnswerTotal,
              wrongAnswerTotal,
              studiedAt,
            });
          }

          if (correctAnswerTotal > 0 && wrongAnswerTotal === 0) {
            state.current.gameStatistic.bestSeries += correctAnswerTotal;
          } else {
            state.current.gameStatistic.bestSeries = 0;
          }
        }
        state.current.currentWord = state.current.words.pop();
        state.current.choice = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state, { meta }) => {
        if (state.status === requestStatus.idle) {
          state.status = meta.requestStatus;
        }
      })
      .addCase(fetchGames.fulfilled, (state, { meta, payload: games }) => {
        if (state.status === requestStatus.pending) {
          state.status = meta.requestStatus;
          gameStatisticsAdapter.setAll(state, games);
        }
      })
      .addCase(fetchGames.rejected, (state, { error }) => {
        if (state.status === requestStatus.pending) {
          state.status = requestStatus.idle;
          state.error = error.message;
        }
      });
  },
});

export const { choose, pickWord, response, startNewGame } = gamesSlice.actions;

export const {
  selectAll: selectAllGames,
  selectById: selectGamesById,
} = gameStatisticsAdapter.getSelectors<RootState>((state) => state[name]);

export const selectCurrentGameStatistic = (state: RootState) => state[name].current;

export const selectCurrentWord = (state: RootState) => {
  const currentGame = state[name].current;
  if (currentGame) {
    return currentGame.currentWord;
  }
  return null;
};

export const selectChoice = (state: RootState) => state[name].current?.choice;

export default gamesSlice.reducer;
