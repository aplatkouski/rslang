import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectDifficultUserWordsByChunk } from 'features/user-words/userWordsSlice';
import React from 'react';
import WordGridList from './WordGridList';
import { selectDifficultWordsByChunk } from './wordsSlice';

interface SelectProps {
  group: number;
  chunk: number;
}

const DifficultWordsSection = (): JSX.Element => {
  const { group, page } = useAppParams();

  const selectProps: SelectProps = {
    group: extractRouterParam(group, 0),
    chunk: extractRouterParam(page, 0),
  };

  const difficultWords = useAppSelector((state) =>
    selectDifficultWordsByChunk(state, selectProps)
  );

  const userWords = useAppSelector((state) =>
    selectDifficultUserWordsByChunk(state, selectProps)
  );

  return <WordGridList userWords={userWords} words={difficultWords} />;
};

export default DifficultWordsSection;
