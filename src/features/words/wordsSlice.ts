import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import { IWord, IWords, IDefiniteWordOptions, WordsList } from '../../types';
import {
  api,
  COULD_NOT_GET_WORDS,
  GET_WORDS_API,
  SERVER_OK_STATUS,
  GET_AGGREGATED_WORDS_API,
  WORDS_PER_PAGE,
} from '../../constants';

const initialState: IWords = {
  data: [],
  loading: false,
  loadError: undefined,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setStartWordsLoading: (state) => {
      state.loading = true;
      state.loadError = undefined;
    },
    setWordsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWordsLoadError: (state, action: PayloadAction<string | undefined>) => {
      state.loadError = action.payload;
    },
    setWords: (state, action: PayloadAction<Array<IWord>>) => {
      state.data = action.payload;
    },
    setWordOptions: (state, action: PayloadAction<IDefiniteWordOptions>) => {
      const index = state.data.findIndex((el) => String(el.id) === action.payload.wordId);
      if (index > -1) {
        state.data[index].optional = action.payload.options;
      }
    },
  },
});

export const loadWords = (
  sectorNum: number,
  pageNum: number,
  userId?: string,
  userToken?: string
): AppThunk => async (dispatch) => {
  dispatch(setStartWordsLoading());

  try {
    // Вначале извлекаем основную информацию по словам на заданной странице заданного раздела

    const params = new URLSearchParams([
      ['page', `${pageNum}`],
      ['group', `${sectorNum}`],
    ]);
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    const response = await fetch(`${api}/${GET_WORDS_API}?${params}`, options);

    if (response.status !== SERVER_OK_STATUS) {
      dispatch(setWordsLoadError(COULD_NOT_GET_WORDS));
    } else {
      const words = (await response.json()) as WordsList;

      // После того как успешно извлекли основную информацию по словам,
      // приступаем к извлечению опций, имеющих отношение к словам и заданных текущим пользователем

      if (userId && userToken) {
        const params2 = new URLSearchParams([
          ['page', `${pageNum}`],
          ['group', `${sectorNum}`],
          ['wordsPerPage', `${WORDS_PER_PAGE}`],
          ['filter', '{"userWord.optional":{"$exists":true}}'],
        ]);
        const options2 = {
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        };
        const response2 = await fetch(
          `${api}/${GET_AGGREGATED_WORDS_API(userId)}?${params2}`,
          options2
        );

        if (response2.status === SERVER_OK_STATUS) {
          const optionsData = await response2.json();

          if (optionsData && optionsData.length && optionsData[0].paginatedResults) {
            for (let i = 0; i < optionsData[0].paginatedResults.length; i += 1) {
              const word = optionsData[0].paginatedResults[i];
              // eslint-disable-next-line no-underscore-dangle
              const index = words.findIndex((el) => el.id === word._id);
              if (index > -1) {
                words[index].optional = word.userWord.optional;
              }
            }
          }
        }
      }

      // В конечном итоге запоминаем полученные слова
      dispatch(setWords(words));
    }
  } catch (e) {
    dispatch(setWordsLoadError(e.message));
  }
  dispatch(setWordsLoadingStatus(false));
};

export const {
  setStartWordsLoading,
  setWords,
  setWordsLoadingStatus,
  setWordsLoadError,
  setWordOptions,
} = wordsSlice.actions;

export const getWords = (state: RootState) => state.words.data;

export const getWordsLoadErrMessage = (state: RootState) => state.words.loadError;

export const getWordsLoadingStatus = (state: RootState) => state.words.loading;

export default wordsSlice.reducer;
