import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import { getCurrUser } from '../user/userSlice';
import { IWord, IWords, IDefiniteWordOptions, WordsList } from '../../types';
import {
  api,
  COULD_NOT_GET_WORDS,
  CREATE_USER_WORDS_API,
  GET_WORDS_API,
  GET_STUDIED_USER_WORDS_API,
  SERVER_OK_STATUS,
  GET_USER_WORDS_API,
  SPECIAL_WORD_INDICATOR,
  WORDS_PER_PAGE,
  COULD_NOT_UPDATE_WORD,
} from '../../constants';
import * as t from '../../types';

const initialState: IWords = {
  data: [],
  loading: false, // true в момент начала загрузки; false по окончании загрузки
  loaded: false, // false с момента начала загрузки; true по окончании загрузки, вне зависимости от ее успеха
  loadError: undefined,
};

export const updateWordOptions = createAsyncThunk<
  IDefiniteWordOptions | undefined,
  IDefiniteWordOptions,
  {
    state: RootState;
    rejectValue: { errorMessage: string };
  }
>(
  'words/updateWordOptions',
  async ({ wordId, options }: IDefiniteWordOptions, { getState, rejectWithValue }) => {
    const { userId, token } = getCurrUser(getState());
    const word = getWords(getState()).find(({ id }) => id === wordId);

    if (!userId || !word) {
      return undefined;
    }

    const body = word?.optional
      ? {
          difficulty: 'none',
          optional: { ...word.optional, ...options },
          group: word.group,
          page: word.page,
        }
      : {
          difficulty: 'none',
          optional: { ...options },
          group: word.group,
          page: word.page,
          // addedAt: new Date().toISOString().substring(0, 10),
        };

    const fetchOptions = {
      method: word?.optional ? 'PUT' : 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(
        `${api}/users/${userId}/words/${word.id}`,
        fetchOptions
      );
      if (response.status !== SERVER_OK_STATUS) {
        return rejectWithValue({ errorMessage: COULD_NOT_UPDATE_WORD(word?.word) });
      }
      return { wordId, options } as IDefiniteWordOptions;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setStartWordsLoading: (state) => {
      state.data = [];
      state.loading = true;
      state.loaded = false;
      state.loadError = undefined;
    },
    setEndWordsLoading: (state) => {
      state.loading = false;
      state.loaded = true;
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
        state.data[index].optional = {
          ...state.data[index].optional,
          ...action.payload.options,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateWordOptions.pending, (state) => {
      state.loadError = undefined;
    });
    builder.addCase(updateWordOptions.fulfilled, (state, { payload }) => {
      if (payload) {
        const index = state.data.findIndex(({ id }) => id === payload.wordId);
        if (index > -1) {
          state.data[index].optional = {
            ...state.data[index].optional,
            ...payload.options,
          };
        }
      }
    });
    builder.addCase(updateWordOptions.rejected, (state, action) => {
      if (action.payload) {
        state.loadError = action.payload.errorMessage;
      } else {
        state.loadError = action.error.message;
      }
    });
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
        dispatch(setWords(words));
      }
    } else {
      const response = await getUserWordsPromise(
        String(userId),
        String(userToken),
        sectorNum,
        pageNum
      );

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
        dispatch(setWords(words));
      }
    }
  } catch (e) {
    dispatch(setWordsLoadError(e.message));
  }

  dispatch(setEndWordsLoading());
};

function getUserStudiedWordsPromise(
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
  return fetch(`${api}/${GET_STUDIED_USER_WORDS_API(userId)}?${params}`, options);
}

export const loadStudiedWords = (
  sectorNum: number,
  pageNum: number,
  userId: string,
  userToken: string
): AppThunk => async (dispatch) => {
  dispatch(setStartWordsLoading());

  let words: WordsList = [];

  try {
    const response = await getUserStudiedWordsPromise(
      userId,
      userToken,
      sectorNum,
      pageNum
    );

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
      dispatch(setWords(words));
    }
  } catch (e) {
    dispatch(setWordsLoadError(e.message));
  }

  dispatch(setEndWordsLoading());
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
      dispatch(setWords(words));
    }
  } catch (e) {
    dispatch(setWordsLoadError(e.message));
  }

  dispatch(setEndWordsLoading());
};

export const {
  setStartWordsLoading,
  setWords,
  setEndWordsLoading,
  setWordsLoadError,
  setWordOptions,
} = wordsSlice.actions;

export const getWords = (state: RootState) => state.words.data;

export const getWordsLoadErrMessage = (state: RootState) => state.words.loadError;

export const getWordsLoadingStatus = (state: RootState): t.IWordsStatus => {
  return {
    loading: state.words.loading,
    loaded: state.words.loaded,
    loadError: state.words.loadError,
  };
};

export const areAllWordsDeleted = (state: RootState): boolean => {
  if (!state.words.data.length) {
    return false;
  }
  for (let i = 0; i < state.words.data.length; i += 1) {
    if (!state.words.data[i].optional || !state.words.data[i].optional?.deleted) {
      return false;
    }
  }
  return true;
};

export default wordsSlice.reducer;
