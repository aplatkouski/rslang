import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import { fetchUserData } from 'features/user/utils';
import * as t from 'types';
import { IGameStatistic } from 'types';
import { requestMethods, requestStatus } from '../../constants';

export const name = 'gameStatistics' as const;

const gameStatisticsAdapter = createEntityAdapter<t.IGameStatistic>();

const initialState: t.IStatus = {
  status: requestStatus.idle,
};

export const fetchGameStatistics = createAsyncThunk<
  Array<t.IGameStatistic>,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/fetch`,
  async (_, { getState }) =>
    (
      await fetchUserData<Array<t.IGameStatistic>>({
        method: requestMethods.GET,
        path: 'statistic/games',
        currentUser: getState().user.current,
      })
    ).map(({ date, ...rest }) => ({ ...rest, date: date.substring(0, 10) })),
  {
    condition: (_, { getState }) =>
      selectGameStatisticRequestStatus(getState()).status !== requestStatus.pending,
  }
);

export const saveNewGameStatistic = createAsyncThunk<
  t.IGameStatistic,
  Omit<t.IGameStatistic, 'id'>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/save`, async (gameStatistic, { getState }) => {
  const { date, ...rest } = await fetchUserData<t.IGameStatistic>({
    method: requestMethods.POST,
    path: 'statistic/games',
    body: gameStatistic,
    currentUser: getState().user.current,
  });
  return { ...rest, date: date.substring(0, 10) };
});

export const removeGameStatistic = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/remove`, async (gameStatisticId, { getState }) => {
  await fetchUserData<null>({
    method: requestMethods.DELETE,
    path: 'statistic/games',
    id: gameStatisticId,
    currentUser: getState().user.current,
  });
  return gameStatisticId;
});

export const updateGameStatistic = createAsyncThunk<
  { id: string; changes: IGameStatistic },
  IGameStatistic,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/update`, async (gameStatistic, { getState }) => {
  await fetchUserData<t.IGameStatistic>({
    method: requestMethods.PUT,
    path: 'statistic/games',
    body: gameStatistic,
    id: gameStatistic.id,
    currentUser: getState().user.current,
  });
  return { id: gameStatistic.id, changes: gameStatistic };
});

const gameStatisticsSlice = createSlice({
  name,
  initialState: gameStatisticsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameStatistics.pending, (state, { meta }) => {
        state.status = meta.requestStatus;
      })
      .addCase(
        fetchGameStatistics.fulfilled,
        (state, { meta, payload: gameStatistics }) => {
          state.status = meta.requestStatus;
          gameStatisticsAdapter.setAll(state, gameStatistics);
        }
      )
      .addCase(fetchGameStatistics.rejected, (state, { meta, error }) => {
        state.error = error.message;
        state.status = meta.requestStatus;
      })
      .addCase(saveNewGameStatistic.fulfilled, gameStatisticsAdapter.addOne)
      .addCase(removeGameStatistic.fulfilled, gameStatisticsAdapter.removeOne)
      .addCase(updateGameStatistic.fulfilled, gameStatisticsAdapter.updateOne);
  },
});

export const {
  selectAll: selectAllGameStatistics,
  selectById: selectGameStatisticById,
} = gameStatisticsAdapter.getSelectors<RootState>((state) => state[name]);

interface SelectWordsProps extends Partial<IGameStatistic> {
  [key: string]: unknown;
}

type SelectorProps<T extends string> = Required<Pick<SelectWordsProps, T>>;

export const selectBestSeriesByGame = createSelector(
  [selectAllGameStatistics, (_: RootState, gameId: string) => gameId],
  (gameStatistics, gameId) => {
    const currentGameStatistics = gameStatistics.filter((s) => s.gameId === gameId);
    if (!currentGameStatistics.length) {
      return undefined;
    }
    const currentGameBestSeries = Math.max(
      ...currentGameStatistics.map((s) => s.bestSeries)
    );

    return currentGameStatistics.find((s) => s.bestSeries === currentGameBestSeries);
  }
);

export const selectBestSeriesByDate = createSelector(
  [selectAllGameStatistics, (_: RootState, { date }: SelectorProps<'date'>) => date],
  (gameStatistics, date) =>
    Object.fromEntries(
      gameStatistics
        .filter((statistic) => statistic.date.localeCompare(date) === 0)
        .map((statistic) => [statistic.gameId, statistic.bestSeries])
    )
);

export const selectBestSeriesAverageByGame = createSelector(
  [selectAllGameStatistics, (_: RootState, gameId: string) => gameId],
  (gameStatistics, gameId) => {
    const currentGameStatistics = gameStatistics.filter((s) => s.gameId === gameId);
    if (!currentGameStatistics.length) {
      return undefined;
    }
    return Math.round(
      currentGameStatistics.reduce((sum, { bestSeries }) => sum + bestSeries, 0) /
        currentGameStatistics.length
    );
  }
);

export const selectGameStatisticRequestStatus = (state: RootState) => ({
  status: state[name].status,
  error: state[name].error,
});

export default gameStatisticsSlice.reducer;
