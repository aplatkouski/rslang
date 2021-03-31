import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import { IWord, IWords, IDefiniteWordOptions, WordsList } from '../../types';
import {
  api,
  COULD_NOT_GET_WORDS,
  CREATE_USER_WORDS_API,
  GET_WORDS_API,
  SERVER_OK_STATUS,
  GET_USER_WORDS_API,
  SPECIAL_WORD_INDICATOR,
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

function getWordsPromise(sectorNum: number, pageNum: number) {
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
  return fetch(`${api}/${GET_WORDS_API}?${params}`, options);
}

function getUserWordsPromise(
  userId: string,
  userToken: string,
  group: number,
  page: number
) {
  const params = new URLSearchParams([
    ['group', `${group}`],
    ['page', `${page}`],
  ]);
  const options = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return fetch(`${api}/${GET_USER_WORDS_API(userId)}?${params}`, options);
}

export const loadWords = (
  sectorNum: number,
  pageNum: number,
  userId?: string,
  userToken?: string
): AppThunk => async (dispatch) => {
  dispatch(setStartWordsLoading());

  let words: WordsList = [];

  try {
    if (!userId || !userToken) {
      const response = await getWordsPromise(sectorNum, pageNum);

      if (response.status !== SERVER_OK_STATUS) {
        dispatch(setWordsLoadError(COULD_NOT_GET_WORDS));
      } else {
        words = (await response.json()) as WordsList;
      }
    } else {
      const response = await getUserWordsPromise(userId, userToken, sectorNum, pageNum);

      if (response.status !== SERVER_OK_STATUS) {
        dispatch(setWordsLoadError(COULD_NOT_GET_WORDS));
      } else {
        words = (await response.json()) as WordsList;
        words.forEach((word) => {
          if (word.userWord) {
            word.optional = word.userWord.optional;
            delete word.userWord;
          }
        });
      }
    }

    dispatch(setWords(words));
  } catch (e) {
    dispatch(setWordsLoadError(e.message));
  }

  dispatch(setWordsLoadingStatus(false));
};

function getUserSpecialWordsPromise(
  userId: string,
  userToken: string,
  group: number,
  page: number,
  requestIndicator: string
) {
  let filter: string = '';
  if (requestIndicator === SPECIAL_WORD_INDICATOR.HARD) {
    filter = '{"userWord.optional.mode":"hard"}';
  } else if (requestIndicator === SPECIAL_WORD_INDICATOR.DEL) {
    filter = '{"userWord.optional.deleted":true}';
  }

  const params = new URLSearchParams([
    ['page', `${page}`],
    ['group', `${group}`],
    ['wordsPerPage', `${WORDS_PER_PAGE}`],
    ['filter', filter],
  ]);

  const options = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  return fetch(`${api}/${CREATE_USER_WORDS_API(userId)}?${params}`, options);
}

export const getUserSpecialWords = (
  sectorNum: number,
  pageNum: number,
  userId: string,
  userToken: string,
  requestIndicator: string
): AppThunk => async (dispatch) => {
  dispatch(setStartWordsLoading());

  const words: WordsList = [];

  try {
    const response = await getUserSpecialWordsPromise(
      userId,
      userToken,
      sectorNum,
      pageNum,
      requestIndicator
    );

    if (response.status !== SERVER_OK_STATUS) {
      dispatch(setWordsLoadError(COULD_NOT_GET_WORDS));
    } else {
      const result: any = await response.json();

      if (result && result[0].paginatedResults) {
        result[0].paginatedResults.forEach((word: any) => {
          if (word.userWord) {
            word.optional = word.userWord.optional;
            delete word.userWord;
            words.push(word);
          }
        });
      }
    }
    dispatch(setWords(words));
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
