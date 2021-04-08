import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectDeletedUserWordsByChunk } from 'features/user-words/userWordsSlice';
import React from 'react';
import WordGridList from './WordGridList';
import { selectDeletedWordsByChunk } from './wordsAPSlice';

interface SelectProps {
  group: number;
  chunk: number;
}

const DeletedWordsSection = (): JSX.Element => {
  const { group, page } = useAppParams();
  const selectProps: SelectProps = {
    group: extractRouterParam(group, 0),
    chunk: extractRouterParam(page, 0),
  };

  const deletedWords = useAppSelector((state) =>
    selectDeletedWordsByChunk(state, selectProps)
  );

  const userWords = useAppSelector((state) =>
    selectDeletedUserWordsByChunk(state, selectProps)
  );

  return <WordGridList userWords={userWords} words={deletedWords} />;
};

export default DeletedWordsSection;
