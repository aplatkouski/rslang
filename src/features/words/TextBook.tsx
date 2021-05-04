import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import React from 'react';
import { ISelectProps } from 'types';
import { PAGES_PER_GROUP, ROUTES } from '../../constants';
import WordGridList from './WordGridList';
import {
  selectActiveWordCountByGroupAndPages,
  selectActiveWordsByPage,
} from './wordsSlice';

const TextBook = (): JSX.Element => {
  const { group, page } = useAppParams();

  const selectProps: ISelectProps = {
    group: extractRouterParam(group, 0),
    page: extractRouterParam(page, 0),
  };

  const activeWords = useAppSelector((state) =>
    selectActiveWordsByPage(state, selectProps)
  );

  const activeWordCountByGroupAndPages = useAppSelector((state) =>
    selectActiveWordCountByGroupAndPages(state, selectProps)
  );

  return (
    <WordGridList
      baseUrl={ROUTES.textbook.url}
      pageCount={PAGES_PER_GROUP}
      showStats
      wordCountByPages={activeWordCountByGroupAndPages}
      words={activeWords}
    />
  );
};

export default TextBook;
