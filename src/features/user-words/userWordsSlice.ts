import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import { fetchUserData } from 'features/user/utils';
import { IChartData, IStatus, IUserWord } from 'types';
import {
  PAGES_PER_GROUP,
  requestMethods,
  requestStatus,
  WORDS_PER_PAGE,
} from '../../constants';

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
    (
      await fetchUserData<Array<IUserWord>>({
        method: requestMethods.GET,
        path: 'words',
        currentUser: getState().user.current,
      })
    ).map(({ addedAt, ...rest }) => ({
      ...rest,
      addedAt: addedAt && addedAt.substring(0, 10),
    })),
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
  const { addedAt, ...rest } = await fetchUserData<IUserWord>({
    method: requestMethods.PUT,
    path: 'words',
    id: wordId,
    body,
    currentUser: getState().user.current,
  });
  return {
    ...rest,
    addedAt: addedAt && addedAt.substring(0, 10),
  };
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

export const selectUserWordByWordId = createSelector(
  [selectAllUserWords, (_: RootState, { wordId }: SelectorProps<'wordId'>) => wordId],
  (userWords, wordId) => userWords.find((word) => word.wordId === wordId)
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

export const selectNotDeletedUserWords = createSelector(selectAllUserWords, (userWords) =>
  userWords.filter((word) => !word.isDeleted)
);

export const selectStudiedUserWordsCountByDate = createSelector(
  selectNotDeletedUserWords,
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

export const selectDeletedWordPageCountByGroup = createSelector(
  selectDeletedUserWordsByGroup,
  (userWords) => Math.ceil(userWords.length / WORDS_PER_PAGE)
);

export const selectDeletedWordCountByGroupAndPages = createSelector(
  selectDeletedUserWordsByGroup,
  (userWords) => {
    const deletedWordsByGroupAndPages = Object.fromEntries(
      Object.entries(Array(PAGES_PER_GROUP).fill(0))
    );

    userWords.forEach((userWord) => {
      deletedWordsByGroupAndPages[userWord.page] += 1;
    });
    return deletedWordsByGroupAndPages;
  }
);

export const selectNotStudiedWordCountByGroupAndPages = createSelector(
  [selectStudiedUserWordsByGroup],
  (studiedWords) => {
    const deletedWordsByGroupAndPages = Object.fromEntries(
      Object.entries(Array(PAGES_PER_GROUP).fill(WORDS_PER_PAGE))
    );

    studiedWords.forEach((userWord) => {
      deletedWordsByGroupAndPages[userWord.page] -= 1;
    });
    return deletedWordsByGroupAndPages;
  }
);

export const selectDifficultUserWordsByChunk = createSelector(
  [
    selectDifficultUserWordsByGroup,
    (_: RootState, { chunk }: SelectorWithChunkProps<'group'>) => chunk,
  ],
  (userWords, chunk) =>
    userWords.slice(chunk * WORDS_PER_PAGE, (chunk + 1) * WORDS_PER_PAGE)
);

export const selectDifficultWordPageCountByGroup = createSelector(
  selectDifficultUserWordsByGroup,
  (userWords) => Math.ceil(userWords.length / WORDS_PER_PAGE)
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

export const selectAllDeletedUserWords = createSelector(selectAllUserWords, (userWords) =>
  userWords.filter((word) => word.isDeleted)
);

export const selectAllDeletedWordIds = createSelector(
  selectAllDeletedUserWords,
  (userWords) => userWords.map((userWord) => userWord.wordId)
);

export const selectAllNotDeletedUserWords = createSelector(
  [selectAllUserWords],
  (userWords) => userWords.filter((userWord) => !userWord.isDeleted)
);

export const selectAllStudiedUserWords = createSelector(
  selectAllNotDeletedUserWords,
  (userWords) => userWords.filter((userWord) => userWord.isStudied)
);

export const selectAllStudiedUserWordIds = createSelector(
  selectAllStudiedUserWords,
  (userWords) => userWords.map((userWord) => userWord.wordId)
);

export const selectStudiedUserWords = createSelector(
  [selectAllNotDeletedUserWords],
  (userWords) => userWords.filter((userWord) => userWord.isStudied)
);

export const selectWordCountByDate = createSelector(
  selectStudiedUserWords,
  (userWords) => {
    const totals = {} as { [addedAt: string]: Set<string> };
    userWords.forEach(({ addedAt, wordId }) => {
      if (addedAt) {
        if (!totals[addedAt]) totals[addedAt] = new Set<string>();
        totals[addedAt].add(wordId);
      }
    });
    return totals;
  }
);

export const selectWordCountByDateAsChartData = createSelector(
  [selectWordCountByDate],
  (totals): Array<IChartData> => {
    const sortedTotals = Object.entries(totals).map(([studiedAt, words]) => ({
      studiedAt,
      words: words.size,
    }));
    sortedTotals.sort((a, b) => a.studiedAt.localeCompare(b.studiedAt));
    return sortedTotals;
  }
);

export const selectWordCountCumulativeByDateAsChartData = createSelector(
  [selectWordCountByDateAsChartData],
  (totals): Array<IChartData> => {
    let prevValue = 0;
    const sortedTotals = [...totals];
    sortedTotals.sort((a, b) => a.studiedAt.localeCompare(b.studiedAt));
    return sortedTotals.map(({ studiedAt, words }) => {
      prevValue = words + prevValue;
      return {
        studiedAt,
        words: prevValue,
      };
    });
  }
);

export default userWordsSlice.reducer;
