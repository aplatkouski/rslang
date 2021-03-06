import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import { selectAllDeletedWordIds } from 'features/user-words/userWordsSlice';
import { fetchUserData } from 'features/user/utils';
import * as t from 'types';
import { IWordStatistic } from 'types';
import { requestMethods, requestStatus } from '../../constants';

export const name = 'wordStatistics' as const;

const wordStatisticsAdapter = createEntityAdapter<t.IWordStatistic>();

const initialState: t.IStatus = {
  status: requestStatus.idle,
};

export const fetchWordStatistics = createAsyncThunk<
  Array<t.IWordStatistic>,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/fetch`,
  async (_, { getState }) =>
    (
      await fetchUserData<Array<t.IWordStatistic>>({
        method: requestMethods.GET,
        path: 'statistic/words',
        currentUser: getState().user.current,
      })
    ).map(({ studiedAt, ...rest }) => ({
      ...rest,
      studiedAt: studiedAt && studiedAt.substring(0, 10),
    })),
  {
    condition: (_, { getState }) =>
      selectWordStatisticRequestStatus(getState()).status !== requestStatus.pending,
  }
);

export const saveNewWordStatistic = createAsyncThunk<
  t.IWordStatistic,
  Omit<t.IWordStatistic, 'id'>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/save`, async (wordStatistic, { getState }) => {
  const { studiedAt, ...rest } = await fetchUserData<t.IWordStatistic>({
    method: requestMethods.POST,
    path: 'statistic/words',
    body: wordStatistic,
    currentUser: getState().user.current,
  });
  return {
    ...rest,
    studiedAt: studiedAt && studiedAt.substring(0, 10),
  };
});

export const removeWordStatistic = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/remove`, async (wordStatisticId, { getState }) => {
  await fetchUserData<null>({
    method: requestMethods.DELETE,
    path: 'statistic/words',
    id: wordStatisticId,
    currentUser: getState().user.current,
  });
  return wordStatisticId;
});

export const updateWordStatistic = createAsyncThunk<
  { id: string; changes: IWordStatistic },
  IWordStatistic,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/update`, async (wordStatistic, { getState }) => {
  await fetchUserData<t.IWordStatistic>({
    method: requestMethods.PUT,
    path: 'statistic/words',
    body: wordStatistic,
    id: wordStatistic.id,
    currentUser: getState().user.current,
  });
  return { id: wordStatistic.id, changes: wordStatistic };
});

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
        state.error = error.message;
        state.status = meta.requestStatus;
      })
      .addCase(saveNewWordStatistic.fulfilled, wordStatisticsAdapter.addOne)
      .addCase(removeWordStatistic.fulfilled, wordStatisticsAdapter.removeOne)
      .addCase(updateWordStatistic.fulfilled, wordStatisticsAdapter.updateOne);
  },
});

export const {
  selectAll: selectAllWordStatistics,
} = wordStatisticsAdapter.getSelectors<RootState>((state) => state[name]);

interface ReportCorrectVsWrongAnswers {
  correctAnswerTotal: number;
  wrongAnswerTotal: number;
}

interface SelectWordStatisticsProps extends Partial<t.IWordStatistic> {
  [key: string]: unknown;
}

type SelectorProps<T extends string> = Required<Pick<SelectWordStatisticsProps, T>>;

const correctVsWrongAnswersCombiner = (
  wordStatistics: Array<t.IWordStatistic>
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
    wordStatistics.filter(
      (statistic) =>
        statistic.studiedAt && statistic.studiedAt.localeCompare(studiedAt) === 0
    )
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
    wordStatistics.filter(
      (statistic) =>
        statistic.studiedAt && statistic.studiedAt.localeCompare(studiedAt) === 0
    )
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
        (totalByGameAndDate) =>
          statistic.gameId === totalByGameAndDate.gameId &&
          statistic.studiedAt &&
          statistic.studiedAt.localeCompare(totalByGameAndDate.studiedAt) === 0
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
      const total = totals.find(
        (totalByGameAndDate) => totalByGameAndDate.gameId === statistic.gameId
      );
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

export const selectWordStatisticRequestStatus = (state: RootState) => ({
  status: state[name].status,
  error: state[name].error,
});

export const selectWordStatisticsByDate = createSelector(
  [
    selectAllWordStatistics,
    selectAllDeletedWordIds,
    (_: RootState, { studiedAt }: SelectorProps<'studiedAt'>) => studiedAt,
  ],
  (wordStatistics, deletedWordsIds, studiedAt) => {
    return wordStatistics.filter(
      (wordStatistic) =>
        wordStatistic.studiedAt &&
        wordStatistic.studiedAt.localeCompare(studiedAt) === 0 &&
        !deletedWordsIds.includes(wordStatistic.wordId)
    );
  }
);

export const selectCorrectAnswerPercentByGamesAndDate = createSelector(
  selectWordStatisticsByDate,
  (wordStatistics) => {
    const countAnswersByGames = {} as {
      [key: string]: { correct: number; total: number };
    };

    wordStatistics.forEach(({ gameId, correctAnswerTotal, wrongAnswerTotal }) => {
      if (!countAnswersByGames[gameId]) {
        countAnswersByGames[gameId] = { correct: 0, total: 0 };
      }
      countAnswersByGames[gameId].correct += correctAnswerTotal;
      countAnswersByGames[gameId].total += correctAnswerTotal + wrongAnswerTotal;
    });
    return Object.fromEntries(
      Object.entries(countAnswersByGames).map(([gameId, countAnswer]) => [
        gameId,
        Math.round((countAnswer.correct / countAnswer.total) * 100),
      ])
    );
  }
);

export const selectCorrectAnswerPercentByDate = createSelector(
  selectWordStatisticsByDate,
  (wordStatistics) => {
    const countAnswers = { correct: 0, total: 0 } as { correct: number; total: number };

    wordStatistics.forEach(({ correctAnswerTotal, wrongAnswerTotal }) => {
      countAnswers.correct += correctAnswerTotal;
      countAnswers.total += correctAnswerTotal + wrongAnswerTotal;
    });
    return Math.round((countAnswers.correct / countAnswers.total) * 100);
  }
);

export const selectStudiedWordsByGamesAndDate = createSelector(
  selectWordStatisticsByDate,
  (wordStatistics) => {
    const totals = {} as { [key: string]: Set<string> };
    wordStatistics.forEach((statistic) => {
      if (!totals[statistic.gameId]) {
        totals[statistic.gameId] = new Set();
      }
      totals[statistic.gameId].add(statistic.wordId);
    });
    return Object.fromEntries(
      Object.entries(totals).map(([gameId, words]) => [gameId, words.size])
    );
  }
);

export const selectStudiedWordsByDate = createSelector(
  selectWordStatisticsByDate,
  (wordStatistics) => new Set(wordStatistics).size
);

export default wordStatisticsSlice.reducer;
