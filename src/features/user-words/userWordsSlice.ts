import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import { fetchUserData } from 'features/user/utils';
import { IChartData, IStatus, IUserWord } from 'types';
import { requestMethods, requestStatus, WORDS_PER_PAGE } from '../../constants';

export const name = 'userWords' as const;

const userWordsAdapter = createEntityAdapter<IUserWord>({
  sortComparer: (a, b) => a.wordId.localeCompare(b.wordId),
});

const initialState: IStatus = {
  status: requestStatus.idle,
};

export const fetchUserWords = createAsyncThunk<
  Array<IUserWord>,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/fetch`,
  async (_, { getState }) =>
    fetchUserData<Array<IUserWord>>({
      method: requestMethods.GET,
      path: 'words',
      currentUser: getState().user.current,
    }),
  {
    condition: (_, { getState }) =>
      selectUserWordRequestStatus(getState()).status !== requestStatus.pending,
  }
);

export const removeUserWord = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/remove`, async (userWordId, { getState }) => {
  const userWord = selectUserWordById(getState(), userWordId);
  if (userWord) {
    await fetchUserData<null>({
      method: requestMethods.DELETE,
      path: 'words',
      id: userWord.wordId,
      currentUser: getState().user.current,
    });
  }
  return userWordId;
});

export const upsertUserWord = createAsyncThunk<
  IUserWord,
  Omit<IUserWord, 'id'>,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(`${name}/upsert`, async (userWord, { getState }) => {
  const { wordId, ...body } = userWord;
  return fetchUserData<IUserWord>({
    method: requestMethods.PUT,
    path: 'words',
    id: wordId,
    body,
    currentUser: getState().user.current,
  });
});

const userWordsSlice = createSlice({
  name,
  initialState: userWordsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWords.pending, (state, { meta }) => {
        state.status = meta.requestStatus;
      })
      .addCase(fetchUserWords.fulfilled, (state, { meta, payload: userWords }) => {
        state.status = meta.requestStatus;
        userWordsAdapter.setAll(state, userWords);
      })
      .addCase(fetchUserWords.rejected, (state, { error, meta }) => {
        state.error = error.message;
        state.status = meta.requestStatus;
      })
      .addCase(removeUserWord.fulfilled, userWordsAdapter.removeOne)
      .addCase(removeUserWord.rejected, (state, { error, meta }) => {
        state.error = error.message;
        state.status = meta.requestStatus;
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
export const selectStudiedUserWordsCountByDate = createSelector(
  [selectAllUserWords],
  (userWords) => {
    const studied = userWords.filter((userWord) => userWord.isStudied);
    const totals = {} as { [key: string]: Set<string> };
    const result: Array<IChartData> = [];
    studied.forEach((word) => {
      if (!totals[String(word.addedAt)]) {
        totals[String(word.addedAt)] = new Set<string>();
      }
      totals[String(word.addedAt)].add(word.wordId);
    });
    Object.entries(totals).map(([studiedAt, words]) =>
      result.push({
        studiedAt: studiedAt.substring(0, 10),
        words: words.size,
      })
    );
    return result.sort((a, b) => a.studiedAt.localeCompare(b.studiedAt));
  }
);

export const selectStudiedWordsTotalCountByDate = createSelector(
  [selectStudiedUserWordsCountByDate],
  (studiedWords) => {
    const result: Array<IChartData> = [];
    studiedWords.forEach((item, idx) => {
      if (idx === 0) {
        result.push(item);
        return;
      }
      result.push({
        studiedAt: item.studiedAt,
        words: item.words + result[idx - 1].words,
      });
    });
    return result;
  }
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

export const selectUserWordRequestStatus = (state: RootState) => ({
  status: state[name].status,
  error: state[name].error,
});

export default userWordsSlice.reducer;
