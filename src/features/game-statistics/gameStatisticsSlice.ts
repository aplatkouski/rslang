import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import {
  ICreateThunkArguments,
  ICredentials,
  IGameStatistic,
  IRemoveThunkArguments,
  IUpdateThunkArguments,
} from 'types';
import { api } from '../../constants';

const name = 'gameStatistics';

const getGameStatisticsApi = (userId: string, id?: string) =>
  `${api}/users/${userId}/statistic/games${id ? `/${id}` : ''}`;

const gameStatisticsAdapter = createEntityAdapter<IGameStatistic>();

interface State {
  status: 'idle' | string;
  error?: string;
}

const initialState: State = {
  status: 'idle',
};

export const fetchGameStatistics = createAsyncThunk<
  Array<IGameStatistic>,
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

    const response = await fetch(getGameStatisticsApi(userId), options);
    return (await response.json()) as Array<IGameStatistic>;
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState()[name];
      return status === 'idle';
    },
  }
);

export const saveNewGameStatistic = createAsyncThunk(
  `${name}/save`,
  async ({
    obj: gameStatistic,
    userId,
    userToken,
  }: ICreateThunkArguments<IGameStatistic>) => {
    const options = {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(gameStatistic),
    };
    const response = await fetch(getGameStatisticsApi(userId), options);
    return (await response.json()) as IGameStatistic;
  }
);

export const removeGameStatistic = createAsyncThunk(
  `${name}/remove`,
  async ({ id: gameStatisticId, userId, userToken }: IRemoveThunkArguments) => {
    const options = {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    await fetch(getGameStatisticsApi(userId, gameStatisticId), options);
    return gameStatisticId;
  }
);

export const updateGameStatistic = createAsyncThunk(
  `${name}/update`,
  async ({
    obj: gameStatistic,
    userId,
    userToken,
  }: IUpdateThunkArguments<IGameStatistic>) => {
    const options = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(gameStatistic),
    };
    await fetch(getGameStatisticsApi(userId, gameStatistic.id), options);
    return { id: gameStatistic.id, changes: gameStatistic };
  }
);

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
        state.status = meta.requestStatus;
        state.error = error.message;
      })
      .addCase(saveNewGameStatistic.fulfilled, gameStatisticsAdapter.addOne)
      .addCase(removeGameStatistic.fulfilled, gameStatisticsAdapter.removeOne)
      .addCase(updateGameStatistic.fulfilled, gameStatisticsAdapter.updateOne);
  },
});

export const {
  selectAll: selectAllGameStatistics,
  selectById: selectGameStatisticById,
} = gameStatisticsAdapter.getSelectors<RootState>((state) => state.gameStatistics);

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

export default gameStatisticsSlice.reducer;
