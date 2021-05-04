import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectStudiedWordCountByGroupAndPages } from 'features/user-words/userWordsSlice';
import React from 'react';
import { ISelectProps } from 'types';
import { PAGES_PER_GROUP, ROUTES } from '../../constants';
import WordGridList from './WordGridList';
import { selectStudiedWordsByPage } from './wordsSlice';

const StudiedWordsSection = (): JSX.Element => {
  const { group, page } = useAppParams();

  const selectProps: ISelectProps = {
    group: extractRouterParam(group, 0),
    page: extractRouterParam(page, 0),
  };

  const studiedWords = useAppSelector((state) =>
    selectStudiedWordsByPage(state, selectProps)
  );

  const studiedWordCountByGroupAndPages = useAppSelector((state) =>
    selectStudiedWordCountByGroupAndPages(state, selectProps)
  );

  return (
    <WordGridList
      baseUrl={ROUTES.studied.url}
      pageCount={PAGES_PER_GROUP}
      wordCountByPages={studiedWordCountByGroupAndPages}
      words={studiedWords}
    />
  );
};

export default StudiedWordsSection;
