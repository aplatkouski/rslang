import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import gamesReducer from 'features/games/gamesSlice';
import sectorsReducer from 'features/sectors/sectorsSlice';
import settingsReducer from 'features/settings/settingsSlice';
import userReducer from 'features/user/userSlice';
import wordsReducer from 'features/words/wordsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    games: gamesReducer,
    sectors: sectorsReducer,
    settings: settingsReducer,
    user: userReducer,
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
