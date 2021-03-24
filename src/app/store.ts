import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import sectorsReducer from 'app/sectors/sectorsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sectors: sectorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
