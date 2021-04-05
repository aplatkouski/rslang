import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import { selectAllGames } from 'features/games/gamesSlice';
import {
  ICreateThunkArguments,
  ICredentials,
  IRemoveThunkArguments,
  IUpdateThunkArguments,
  IWordStatistic,
} from 'types';
import { api } from '../../constants';

const name = 'wordStatistics';

const getWordStatisticsApi = (userId: string, id?: string) =>
  `${api}/users/${userId}/statistic/words${id ? `/${id}` : ''}`;

const wordStatisticsAdapter = createEntityAdapter<IWordStatistic>();

interface State {
  status: 'idle' | string;
  error?: string;
}

const initialState: State = {
  status: 'idle',
};

export const fetchWordStatistics = createAsyncThunk<
  Array<IWordStatistic>,
  ICredentials,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/fetch`,
  async ({ userId, userToken }) => {
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    const response = await fetch(getWordStatisticsApi(userId), options);
    return (await response.json()) as Array<IWordStatistic>;
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState()[name];
      return status === 'idle';
    },
  }
);

export const saveNewWordStatistic = createAsyncThunk(
  `${name}/save`,
  async ({
    obj: wordStatistic,
    userId,
    userToken,
  }: ICreateThunkArguments<IWordStatistic>) => {
    const options = {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(wordStatistic),
    };
    const response = await fetch(getWordStatisticsApi(userId), options);
    return (await response.json()) as IWordStatistic;
  }
);

export const removeWordStatistic = createAsyncThunk(
  `${name}/remove`,
  async ({ id: wordStatisticId, userId, userToken }: IRemoveThunkArguments) => {
    const options = {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    await fetch(getWordStatisticsApi(userId, wordStatisticId), options);
    return wordStatisticId;
  }
);

export const updateWordStatistic = createAsyncThunk(
  `${name}/update`,
  async ({
    obj: wordStatistic,
    userId,
    userToken,
  }: IUpdateThunkArguments<IWordStatistic>) => {
    const options = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(wordStatistic),
    };
    await fetch(getWordStatisticsApi(userId, wordStatistic.id), options);
    return { id: wordStatistic.id, changes: wordStatistic };
  }
);

const wordStatisticsSlice = createSlice({
  name,
  initialState: wordStatisticsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordStatistics.pending, (state, { meta }) => {
        state.status = meta.requestStatus;
      })
      .addCase(
        fetchWordStatistics.fulfilled,
        (state, { meta, payload: wordStatistics }) => {
          state.status = meta.requestStatus;
          wordStatisticsAdapter.setAll(state, wordStatistics);
        }
      )
      .addCase(fetchWordStatistics.rejected, (state, { meta, error }) => {
        state.status = meta.requestStatus;
        state.error = error.message;
      })
      .addCase(saveNewWordStatistic.fulfilled, wordStatisticsAdapter.addOne)
      .addCase(removeWordStatistic.fulfilled, wordStatisticsAdapter.removeOne)
      .addCase(updateWordStatistic.fulfilled, wordStatisticsAdapter.updateOne);
  },
});

export const {
  selectAll: selectAllWordStatistics,
  selectById: selectWordStatisticById,
} = wordStatisticsAdapter.getSelectors<RootState>((state) => state.wordStatistics);

interface ReportWordCountByGames {
  [gameId: string]: number;
}

/**
 * Note: use `selectAllGames` to count words only for games that are exists now
 *
 * TODO: add selectAllStudiedWords from `userWordsSlice`
 */
export const selectWordCountByGames = createSelector(
  [selectAllWordStatistics, selectAllGames],
  (wordStatistics, games): ReportWordCountByGames => {
    const totals = Object.fromEntries(games.map((game) => [game.id, new Set<string>()]));
    wordStatistics.forEach((statistic) => {
      if (totals[statistic.gameId]) {
        totals[statistic.gameId].add(statistic.wordId);
      }
    });
    return Object.fromEntries(
      Object.entries(totals).map(([gameId, words]) => [gameId, words.size])
    );
  }
);

interface ReportWordCountByDate {
  [studiedAt: string]: number;
}

export const selectWordCountByDate = createSelector(
  [selectAllWordStatistics],
  (wordStatistics): ReportWordCountByDate => {
    const totals = {} as { [key: string]: Set<string> };
    wordStatistics.forEach((statistic) => {
      if (!totals[statistic.studiedAt]) {
        totals[statistic.studiedAt] = new Set<string>();
      }
      totals[statistic.studiedAt].add(statistic.wordId);
    });
    return Object.fromEntries(
      Object.entries(totals).map(([studiedAt, words]) => [studiedAt, words.size])
    );
  }
);

interface ReportCorrectVsWrongAnswers {
  correctAnswerTotal: number;
  wrongAnswerTotal: number;
}

interface SelectWordStatisticsProps extends Partial<IWordStatistic> {
  [key: string]: unknown;
}

type SelectorProps<T extends string> = Required<Pick<SelectWordStatisticsProps, T>>;

const correctVsWrongAnswersCombiner = (
  wordStatistics: Array<IWordStatistic>
): ReportCorrectVsWrongAnswers => {
  const total = {
    correctAnswerTotal: 0,
    wrongAnswerTotal: 0,
  };
  wordStatistics.forEach((statistic) => {
    total.correctAnswerTotal += statistic.correctAnswerTotal;
    total.wrongAnswerTotal += statistic.wrongAnswerTotal;
  });
  return total;
};

const selectWordStatisticsByWordId = createSelector(
  [
    selectAllWordStatistics,
    (_: RootState, { wordId }: SelectorProps<'wordId'>) => wordId,
  ],
  (wordStatistics, wordId) =>
    wordStatistics.filter((statistic) => statistic.wordId === wordId)
);

const selectWordStatisticsByGroup = createSelector(
  [selectAllWordStatistics, (_: RootState, { group }: SelectorProps<'group'>) => group],
  (wordStatistics, group) =>
    wordStatistics.filter((statistic) => statistic.group === group)
);

const selectWordStatisticsByGroupAndDate = createSelector(
  [
    selectWordStatisticsByGroup,
    (_: RootState, { studiedAt }: SelectorProps<'group' | 'studiedAt'>) => studiedAt,
  ],
  (wordStatistics, studiedAt) =>
    wordStatistics.filter((statistic) => !statistic.studiedAt.localeCompare(studiedAt))
);

const selectWordStatisticsByPage = createSelector(
  [
    selectWordStatisticsByGroup,
    (_: RootState, { page }: SelectorProps<'group' | 'page'>) => page,
  ],
  (wordStatistics, page) => wordStatistics.filter((statistic) => statistic.page === page)
);

const selectWordStatisticsByPageAndDate = createSelector(
  [
    selectWordStatisticsByPage,
    (_: RootState, { studiedAt }: SelectorProps<'group' | 'page' | 'studiedAt'>) =>
      studiedAt,
  ],
  (wordStatistics, studiedAt) =>
    wordStatistics.filter((statistic) => !statistic.studiedAt.localeCompare(studiedAt))
);

export const selectCorrectVsWrongByGroup = createSelector(
  selectWordStatisticsByGroup,
  correctVsWrongAnswersCombiner
);

export const selectCorrectVsWrongByGroupAndDate = createSelector(
  selectWordStatisticsByGroupAndDate,
  correctVsWrongAnswersCombiner
);

export const selectCorrectVsWrongByPage = createSelector(
  selectWordStatisticsByPage,
  correctVsWrongAnswersCombiner
);

export const selectCorrectVsWrongByPageAndDate = createSelector(
  selectWordStatisticsByPageAndDate,
  correctVsWrongAnswersCombiner
);

export const selectCorrectVsWrongByWordId = createSelector(
  selectWordStatisticsByWordId,
  correctVsWrongAnswersCombiner
);

interface GroupByGameAndDate {
  gameId: string;
  studiedAt: string;
  correctAnswerTotal: number;
  wrongAnswerTotal: number;
}

/*
 * TODO: add `selectAllGames` and calculate stats for existing games only
 */
export const selectCorrectVsWrongGroupByGameAndDate = createSelector(
  [selectAllWordStatistics],
  (wordStatistics) => {
    const totals = [] as Array<GroupByGameAndDate>;
    wordStatistics.forEach((statistic) => {
      const total = totals.find(
        (t) =>
          statistic.gameId === t.gameId && !statistic.studiedAt.localeCompare(t.studiedAt)
      );
      if (total) {
        total.correctAnswerTotal += statistic.correctAnswerTotal;
        total.wrongAnswerTotal += statistic.wrongAnswerTotal;
      } else {
        const { gameId, studiedAt, correctAnswerTotal, wrongAnswerTotal } = statistic;
        totals.push({
          gameId,
          studiedAt,
          correctAnswerTotal,
          wrongAnswerTotal,
        });
      }
    });
    return totals;
  }
);

export const selectCorrectVsWrongGroupByGame = createSelector(
  [selectAllWordStatistics],
  (wordStatistics) => {
    const totals = [] as Array<Omit<GroupByGameAndDate, 'studiedAt'>>;
    wordStatistics.forEach((statistic) => {
      const total = totals.find((t) => t.gameId === statistic.gameId);
      if (total) {
        total.correctAnswerTotal += statistic.correctAnswerTotal;
        total.wrongAnswerTotal += statistic.wrongAnswerTotal;
      } else {
        const { gameId, correctAnswerTotal, wrongAnswerTotal } = statistic;
        totals.push({
          gameId,
          correctAnswerTotal,
          wrongAnswerTotal,
        });
      }
    });
    return totals;
  }
);

export default wordStatisticsSlice.reducer;