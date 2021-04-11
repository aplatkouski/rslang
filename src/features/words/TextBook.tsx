import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectUserWordsByPage } from 'features/user-words/userWordsSlice';
import React from 'react';
import { PAGES_PER_SECTOR } from '../../constants';
import WordGridList from './WordGridList';
import { selectActiveWordsByPage } from './wordsSlice';

const TextBook = (): JSX.Element => {
  const { group, page } = useAppParams();

  const selectProps = {
    group: extractRouterParam(group, 0),
    page: extractRouterParam(page, 0),
  };

  const activeWords = useAppSelector((state) =>
    selectActiveWordsByPage(state, selectProps)
  );
  const userWords = useAppSelector((state) => selectUserWordsByPage(state, selectProps));

  return (
    <WordGridList
      baseUrl="textbook"
      pageCount={PAGES_PER_SECTOR}
      userWords={userWords}
      words={activeWords}
    />
  );
};

export default TextBook;
