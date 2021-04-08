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
import { api, PAGES_PER_GROUP } from '../../constants';

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

export const selectAllDeletedWords = createSelector(selectAllUserWords, (userWords) =>
  userWords.filter((word) => word.isDeleted)
);

const selectNotDeletedWords = createSelector(selectAllUserWords, (userWords) =>
  userWords.filter((word) => !word.isDeleted)
);

export const selectAllStudiedWords = createSelector(selectNotDeletedWords, (userWords) =>
  userWords.filter((word) => word.addedAt)
);

export const selectAllDifficultWords = createSelector(
  selectNotDeletedWords,
  (userWords) => userWords.filter((word) => word.isDifficult)
);

export default userWordsSlice.reducer;
