import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectStudiedUserWordsByPage } from 'features/user-words/userWordsSlice';
import React from 'react';
import WordGridList from './WordGridList';
import { selectStudiedWordsByPage } from './wordsSlice';

interface SelectProps {
  group: number;
  page: number;
}

const StudiedWordsSection = (): JSX.Element => {
  const { group, page } = useAppParams();

  const selectProps: SelectProps = {
    group: extractRouterParam(group, 0),
    page: extractRouterParam(page, 0),
  };

  const studiedWords = useAppSelector((state) =>
    selectStudiedWordsByPage(state, selectProps)
  );

  const userWords = useAppSelector((state) =>
    selectStudiedUserWordsByPage(state, {
      group: extractRouterParam(group, 0),
      page: extractRouterParam(page, 0),
    })
  );

  return <WordGridList userWords={userWords} words={studiedWords} />;
};

export default StudiedWordsSection;
