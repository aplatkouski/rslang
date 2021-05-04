import { useAppSelector } from 'common/hooks';
import { selectDifficultWordCountByGroupsAndChunks } from 'features/user-words/userWordsSlice';
import React from 'react';
import { useLocation } from 'react-router-dom';
import GroupsPage from './GroupsPage';

const DifficultWordsGroups = (): JSX.Element => {
  const { pathname } = useLocation();
  const wordCount = useAppSelector(selectDifficultWordCountByGroupsAndChunks);

  return <GroupsPage baseUrl={pathname} wordCount={wordCount} />;
};

export default DifficultWordsGroups;
