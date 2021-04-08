import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'app/store';
import {
  selectDeletedWordIdsByChunk,
  selectDeletedWordIdsByGroup,
  selectDifficultWordIdsByChunk,
  selectStudiedWordIdsByPage,
} from 'features/user-words/userWordsSlice';
import { IWord } from 'types';
import { api } from '../../constants';

export const name = 'wordsAP' as const;

const wordsAdapter = createEntityAdapter<IWord>({
  sortComparer: (a, b) => a.word.localeCompare(b.word),
});

interface State {
  status: 'idle' | string;
  error?: string;
}

const initialState: State = {
  status: 'idle',
};

export const fetchWords = createAsyncThunk<
  Array<IWord>,
  unknown,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  `${name}/fetch`,
  async () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    const response = await fetch(`${api}/words/all`, options);
    return (await response.json()) as Array<IWord>;
  },
  {
    condition: (_: unknown, { getState }) => {
      const { status } = getState()[name];
      return status === 'idle';
    },
  }
);

const wordsSlice = createSlice({
  name,
  initialState: wordsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state, { meta }) => {
        if (state.status === 'idle') {
          state.status = meta.requestStatus;
        }
      })
      .addCase(fetchWords.fulfilled, (state, { meta, payload: words }) => {
        if (state.status === 'pending') {
          state.status = meta.requestStatus;
          wordsAdapter.setAll(state, words);
        }
      })
      .addCase(fetchWords.rejected, (state, { error }) => {
        if (state.status === 'pending') {
          state.status = 'idle';
          state.error = error.message;
        }
      });
  },
});

export const {
  selectAll: selectAllWords,
  selectById: selectWordsById,
} = wordsAdapter.getSelectors<RootState>((state) => state[name]);

interface SelectWordsProps extends Partial<IWord> {
  [key: string]: unknown;
}

type SelectorProps<T extends string> = Required<Pick<SelectWordsProps, T>>;

const selectWordsByGroup = createSelector(
  [selectAllWords, (_: RootState, { group }: SelectorProps<'group'>) => group],
  (words, group) => words.filter((word) => word.group === group)
);

export const selectActiveWordsByGroup = createSelector(
  [selectWordsByGroup, selectDeletedWordIdsByGroup],
  (words, deletedWordIds) => words.filter((word) => !deletedWordIds.includes(word.id))
);

export const selectActiveWordsByPage = createSelector(
  [
    selectActiveWordsByGroup,
    (_: RootState, { page }: SelectorProps<'group' | 'page'>) => page,
  ],
  (words, page) => words.filter((word) => word.page === page)
);

export const selectDeletedWordsByChunk = createSelector(
  [selectWordsByGroup, selectDeletedWordIdsByChunk],
  (words, deletedWordIds) => words.filter((word) => deletedWordIds.includes(word.id))
);

export const selectDifficultWordsByChunk = createSelector(
  [selectActiveWordsByGroup, selectDifficultWordIdsByChunk],
  (words, difficultWordIds) => words.filter((word) => difficultWordIds.includes(word.id))
);

export const selectStudiedWordsByPage = createSelector(
  [selectActiveWordsByPage, selectStudiedWordIdsByPage],
  (words, studiedWordIds) => words.filter((word) => studiedWordIds.includes(word.id))
);

export default wordsSlice.reducer;
