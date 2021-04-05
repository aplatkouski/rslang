import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import gameStatisticsReducer from 'features/game-statistics/gameStatisticsSlice';
import gamesReducer from 'features/games/gamesSlice';
import sectorsReducer from 'features/sectors/sectorsSlice';
import settingsReducer from 'features/settings/settingsSlice';
import userReducer from 'features/user/userSlice';
import wordStatisticsReducer from 'features/word-statistics/wordStatisticsSlice';
import wordsReducer from 'features/words/wordsSlice';

export const store = configureStore({
  reducer: {
    gameStatistics: gameStatisticsReducer,
    games: gamesReducer,
    sectors: sectorsReducer,
    settings: settingsReducer,
    user: userReducer,
    wordStatistics: wordStatisticsReducer,
    words: wordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
