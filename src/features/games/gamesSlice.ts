import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import { IGame, IGameStatistic, IStatus, IWordStatistic } from 'types';
import { api, requestStatus } from '../../constants';

const name = 'games' as const;

const gameStatisticsAdapter = createEntityAdapter<IGame>({
  sortComparer: (a, b) => a.num - b.num,
});

interface State extends IStatus {
  current?: {
    data?: unknown;
    wordStatistics: Array<IWordStatistic>;
    gameStatistic: IGameStatistic;
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

const gamesSlice = createSlice({
  name,
  initialState: gameStatisticsAdapter.getInitialState(initialState),
  reducers: {},
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

export const {
  selectAll: selectAllGames,
  selectById: selectGamesById,
} = gameStatisticsAdapter.getSelectors<RootState>((state) => state[name]);

export default gamesSlice.reducer;
