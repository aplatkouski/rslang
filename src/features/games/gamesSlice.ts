import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import { IGame } from 'types';
import { api } from '../../constants';

const name = 'games' as const;

const gameStatisticsAdapter = createEntityAdapter<IGame>({
  sortComparer: (a, b) => a.num - b.num,
});

interface State {
  status: 'idle' | string;
  error?: string;
}

const initialState: State = {
  status: 'idle',
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
    condition: (_: unknown, { getState }) => {
      const { status } = getState()[name];
      return status === 'idle';
    },
  }
);

const gamesSlice = createSlice({
  name,
  initialState: gameStatisticsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state, { meta }) => {
        if (state.status === 'idle') {
          state.status = meta.requestStatus;
        }
      })
      .addCase(fetchGames.fulfilled, (state, { meta, payload: games }) => {
        if (state.status === 'pending') {
          state.status = meta.requestStatus;
          gameStatisticsAdapter.setAll(state, games);
        }
      })
      .addCase(fetchGames.rejected, (state, { error }) => {
        if (state.status === 'pending') {
          state.status = 'idle';
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
