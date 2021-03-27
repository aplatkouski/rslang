import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import sectorsReducer from 'features/sectors/sectorsSlice';
import settingsReducer from 'features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sectors: sectorsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
