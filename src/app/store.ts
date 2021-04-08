import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import gameStatisticsReducer, {
  name as gameStats,
} from 'features/game-statistics/gameStatisticsSlice';
import gamesReducer from 'features/games/gamesSlice';
import sectorsReducer from 'features/sectors/sectorsSlice';
import settingsReducer from 'features/settings/settingsSlice';
import userWordsReducer, { name as userWords } from 'features/user-words/userWordsSlice';
import userReducer from 'features/user/userSlice';
import wordStatisticsReducer, {
  name as wordStats,
} from 'features/word-statistics/wordStatisticsSlice';
import wordsAPReducer, { name as wordsAP } from 'features/words/wordsAPSlice';
import wordsReducer from 'features/words/wordsSlice';

export const store = configureStore({
  reducer: {
    [gameStats]: gameStatisticsReducer,
    games: gamesReducer,
    sectors: sectorsReducer,
    settings: settingsReducer,
    user: userReducer,
    [wordStats]: wordStatisticsReducer,
    words: wordsReducer,
    [wordsAP]: wordsAPReducer,
    [userWords]: userWordsReducer,
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
