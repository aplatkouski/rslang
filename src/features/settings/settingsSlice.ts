import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import * as t from 'types';

const LOCALSTORAGE_KEY = 'settings';

const initialState: t.Settings = {
  isShowTranslations: true,
  isShowButtons: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings: (state, { payload: settings }: PayloadAction<t.Settings>) => {
      state.isShowButtons = settings.isShowButtons;
      state.isShowTranslations = settings.isShowTranslations;

      const lsItem: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
      const savedSettings = lsItem ? (JSON.parse(lsItem) as t.Settings) : {};

      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify({
          ...savedSettings,
          ...settings,
        })
      );
    },
  },
});

export const getSettingsFromLocalStorage = (): AppThunk => (dispatch) => {
  const savedSettings = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || 'null'
  ) as t.Settings | null;

  if (savedSettings) {
    const { isShowTranslations, isShowButtons } = savedSettings;
    dispatch(changeSettings({ isShowTranslations, isShowButtons }));
  }
};

export const { changeSettings } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
