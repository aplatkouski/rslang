import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { IGames } from 'types';
import { api } from '../../constants';

const name = 'games';

const gameStatisticsAdapter = createEntityAdapter<IGames>();

interface State {
  status: 'idle' | string;
  error?: string;
}

const initialState: State = {
  status: 'idle',
};

export const fetchGames = createAsyncThunk(`${name}/fetch`, async () => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  const response = await fetch(`${api}/games`, options);
  return (await response.json()) as Array<IGames>;
});

const gamesSlice = createSlice({
  name,
  initialState: gameStatisticsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state, { type }) => {
        state.status = type;
      })
      .addCase(fetchGames.fulfilled, (state, { type, payload: gameStatistics }) => {
        state.status = type;
        gameStatisticsAdapter.setAll(state, gameStatistics);
      })
      .addCase(fetchGames.rejected, (state, { type, error }) => {
        state.status = type;
        state.error = error.message;
      });
  },
});

export const {
  selectAll: selectAllGames,
  selectById: selectGamesById,
} = gameStatisticsAdapter.getSelectors<RootState>((state) => state.games);

export default gamesSlice.reducer;
