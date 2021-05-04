import { useAppSelector } from 'common/hooks';
import { selectStudiedWordCountByGroupsAndPages } from 'features/words/wordsSlice';
import React from 'react';
import { useLocation } from 'react-router-dom';
import GroupsPage from './GroupsPage';

const StudiedWordsGroups = (): JSX.Element => {
  const { pathname } = useLocation();
  const wordCount = useAppSelector(selectStudiedWordCountByGroupsAndPages);

  return <GroupsPage baseUrl={pathname} wordCount={wordCount} />;
};

export default StudiedWordsGroups;
