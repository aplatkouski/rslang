import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import {
  IWord,
  IWords,
  IWordOptions,
  IDefiniteWordOptions,
  WordsList,
} from '../../types';
import {
  api,
  COULD_NOT_GET_WORDS,
  GET_WORDS_API,
  SERVER_OK_STATUS,
  GET_USER_WORD_API,
  // WORDS_PER_PAGE,
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

function getUserWordPromise(userId: string, wordId: string, userToken: string) {
  const options = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  return fetch(`${api}/${GET_USER_WORD_API(userId, wordId)}`, options);
}

export const loadWords = (
  sectorNum: number,
  pageNum: number,
  userId?: string,
  userToken?: string
): AppThunk => async (dispatch) => {
  dispatch(setStartWordsLoading());

  try {
    const response = await getWordsPromise(sectorNum, pageNum);

    if (response.status !== SERVER_OK_STATUS) {
      dispatch(setWordsLoadError(COULD_NOT_GET_WORDS));
    } else {
      const words = (await response.json()) as WordsList;

      const setWordOptions = (wordId: string, options: IWordOptions) => {
        const index = words.findIndex((el) => el.id === wordId);
        if (index > -1) {
          words[index].optional = options;
        }
      };

      if (userId && userToken) {
        const promiseArr: Array<Promise<Response>> = [];

        for (let i = 0; i < words.length; i += 1) {
          promiseArr.push(getUserWordPromise(userId, words[i].id, userToken));
        }

        const responses = await Promise.all(promiseArr);

        for (let i = 0; i < responses.length; i += 1) {
          const resp: Response = responses[i];

          if (resp.status === SERVER_OK_STATUS) {
            const findRes = resp.url.match(/words(.*)$/);
            const urlSubstr = findRes ? findRes[0] : '';
            const id = urlSubstr.substring(urlSubstr.indexOf('/') + 1);
            resp
              .json()
              .then((options) => setWordOptions(id, options.optional))
              .catch(() => {});
          }
        }
      }
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
