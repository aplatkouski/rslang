import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectDeletedWordCountByGroupAndPages } from 'features/user-words/userWordsSlice';
import React from 'react';
import { PAGES_PER_GROUP, ROUTES } from '../../constants';
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

  const deletedWordCountByPages = useAppSelector((state) =>
    selectDeletedWordCountByGroupAndPages(state, selectProps)
  );

  return (
    <WordGridList
      baseUrl={ROUTES.textbook.url}
      countDeletedWordByPages={deletedWordCountByPages}
      pageCount={PAGES_PER_GROUP}
      words={activeWords}
    />
  );
};

export default TextBook;
