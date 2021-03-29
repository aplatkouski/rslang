import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as t from 'types';
import type { AppThunk, RootState } from 'app/store';
import { LOCALSTORAGE_KEY } from '../../constants';

interface SettingsState {
  value: t.Settings;
}

const initialState: SettingsState = {
  value: {
    translation: true,
    buttons: true,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings: (state, action: PayloadAction<t.Settings>) => {
      state.value = action.payload;

      const lsItem: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
      const savedSettings = lsItem ? (JSON.parse(lsItem) as t.Settings) : {};

      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify({
          ...savedSettings,
          ...action.payload,
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
    const { translation, buttons } = savedSettings;
    const settings: t.Settings = {
      translation,
      buttons,
    };
    dispatch(changeSettings(settings));
  }
};

export const { changeSettings } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings.value;
export default settingsSlice.reducer;
