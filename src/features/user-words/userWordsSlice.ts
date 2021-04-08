import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import {
  ICreateThunkArguments,
  ICredentials,
  IRemoveThunkArguments,
  IUserWord,
} from 'types';
import { api, PAGES_PER_GROUP, WORDS_PER_PAGE } from '../../constants';

export const name = 'userWords' as const;

const getUserWordsApi = (userId: string, id?: string) =>
  `${api}/users/${userId}/words${id ? `/${id}` : ''}`;

const userWordsAdapter = createEntityAdapter<IUserWord>({
  sortComparer: (a, b) => (a.group - b.group) * PAGES_PER_GROUP + (a.page - b.page),
});

interface State {
  status: 'idle' | string;
  error?: string;
}

const initialState: State = {
  status: 'idle',
};

export const fetchUserWords = createAsyncThunk<
  Array<IUserWord>,
  ICredentials,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/fetch`,
  async ({ userId, userToken }) => {
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    const response = await fetch(getUserWordsApi(userId), options);
    return (await response.json()) as Array<IUserWord>;
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState()[name];
      return status === 'idle';
    },
  }
);

export const removeUserWord = createAsyncThunk<
  string,
  IRemoveThunkArguments,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/remove`, async ({ id: userWordId, userId, userToken }, { getState }) => {
  const { wordId } = getState()[name].entities[userWordId]!;
  const options = {
    method: 'DELETE',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };
  await fetch(getUserWordsApi(userId, wordId), options);
  return userWordId;
});

export const upsertUserWord = createAsyncThunk(
  `${name}/upsert`,
  async ({ obj: userWord, userId, userToken }: ICreateThunkArguments<IUserWord>) => {
    const { wordId, ...body } = userWord;
    const options = {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(getUserWordsApi(userId, wordId), options);
    return (await response.json()) as IUserWord;
  }
);

const userWordsSlice = createSlice({
  name,
  initialState: userWordsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWords.pending, (state, { meta }) => {
        if (state.status === 'idle') {
          state.status = `${meta.requestStatus}`;
        }
      })
      .addCase(fetchUserWords.fulfilled, (state, { meta, payload: userWords }) => {
        if (state.status === 'pending') {
          state.status = `${meta.requestStatus}`;
          userWordsAdapter.setAll(state, userWords);
        }
      })
      .addCase(fetchUserWords.rejected, (state, { error }) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.error = error.message;
        }
      })
      .addCase(removeUserWord.fulfilled, userWordsAdapter.removeOne)
      .addCase(removeUserWord.rejected, (state, { error }) => {
        state.status = 'idle';
        state.error = error.message;
      })
      .addCase(upsertUserWord.fulfilled, (state, { payload: userWord }) => {
        userWordsAdapter.removeOne(state, userWord.id);
        userWordsAdapter.addOne(state, userWord);
      });
  },
});

export const {
  selectAll: selectAllUserWords,
  selectById: selectUserWordById,
} = userWordsAdapter.getSelectors<RootState>((state) => state[name]);

interface SelectWordsProps extends Partial<IUserWord> {
  [key: string]: unknown;
}
type SelectorProps<T extends string> = Required<Pick<SelectWordsProps, T>>;
type SelectorWithChunkProps<T extends string> = Required<
  Pick<SelectWordsProps, T> & { chunk: number }
>;

export const selectUserWordsByWordId = createSelector(
  [selectAllUserWords, (_: RootState, { wordId }: SelectorProps<'wordId'>) => wordId],
  (userWords, wordId) => userWords.filter((word) => word.wordId === wordId)
);

const selectUserWordsByGroup = createSelector(
  [selectAllUserWords, (_: RootState, { group }: SelectorProps<'group'>) => group],
  (userWords, group) => userWords.filter((word) => word.group === group)
);

export const selectUserWordsByPage = createSelector(
  [
    selectUserWordsByGroup,
    (_: RootState, { page }: SelectorProps<'group' | 'page'>) => page,
  ],
  (userWords, page) => userWords.filter((word) => word.page === page)
);

export const selectWordsIdsByPage = createSelector(selectUserWordsByPage, (userWords) =>
  userWords.map((userWord) => userWord.wordId)
);

export const selectDeletedUserWordsByGroup = createSelector(
  selectUserWordsByGroup,
  (userWords) => userWords.filter((word) => word.isDeleted)
);

export const selectNotDeletedUserWordsByGroup = createSelector(
  selectUserWordsByGroup,
  (userWords) => userWords.filter((word) => !word.isDeleted)
);

export const selectDifficultUserWordsByGroup = createSelector(
  selectNotDeletedUserWordsByGroup,
  (userWords) => userWords.filter((word) => word.isDifficult)
);

export const selectStudiedUserWordsByGroup = createSelector(
  selectNotDeletedUserWordsByGroup,
  (userWords) => userWords.filter((word) => word.isStudied)
);

export const selectStudiedUserWordsByPage = createSelector(
  [
    selectStudiedUserWordsByGroup,
    (_: RootState, { page }: SelectorProps<'group' | 'page'>) => page,
  ],
  (studiedUserWords, page) =>
    studiedUserWords.filter((studiedWord) => studiedWord.page === page)
);

export const selectDeletedWordIdsByGroup = createSelector(
  selectDeletedUserWordsByGroup,
  (userWords) => userWords.map((userWord) => userWord.wordId)
);

export const selectStudiedWordIdsByGroup = createSelector(
  selectStudiedUserWordsByGroup,
  (userWords) => userWords.map((userWord) => userWord.wordId)
);

export const selectStudiedWordIdsByPage = createSelector(
  [selectWordsIdsByPage, selectStudiedWordIdsByGroup],
  (wordIdsByPage, studiedWordIdsByGroup) =>
    wordIdsByPage.filter((wordId) => studiedWordIdsByGroup.includes(wordId))
);

export const selectDeletedUserWordsByChunk = createSelector(
  [
    selectDeletedUserWordsByGroup,
    (_: RootState, { chunk }: SelectorWithChunkProps<'group'>) => chunk,
  ],
  (userWords, chunk) =>
    userWords.slice(chunk * WORDS_PER_PAGE, (chunk + 1) * WORDS_PER_PAGE)
);

export const selectDifficultUserWordsByChunk = createSelector(
  [
    selectDifficultUserWordsByGroup,
    (_: RootState, { chunk }: SelectorWithChunkProps<'group'>) => chunk,
  ],
  (userWords, chunk) =>
    userWords.slice(chunk * WORDS_PER_PAGE, (chunk + 1) * WORDS_PER_PAGE)
);

export const selectDeletedWordIdsByChunk = createSelector(
  selectDeletedUserWordsByChunk,
  (difficultUserWords) => difficultUserWords.map((word) => word.wordId)
);

export const selectDifficultWordIdsByChunk = createSelector(
  selectDifficultUserWordsByChunk,
  (difficultUserWords) => difficultUserWords.map((word) => word.wordId)
);

export default userWordsSlice.reducer;
