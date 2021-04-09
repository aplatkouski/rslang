import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectUserWordsByPage } from 'features/user-words/userWordsSlice';
import React from 'react';
import WordGridList from './WordGridList';
import { selectActiveWordsByPage } from './wordsAPSlice';

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

  return <WordGridList userWords={userWords} words={activeWords} />;
};

export default TextBook;
