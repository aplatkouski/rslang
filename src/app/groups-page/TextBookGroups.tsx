import { useAppSelector } from 'common/hooks';
import { selectActiveWordCountByGroupsAndPages } from 'features/words/wordsSlice';
import React from 'react';
import { useLocation } from 'react-router-dom';
import GroupsPage from './GroupsPage';

const TextBookGroups = (): JSX.Element => {
  const { pathname } = useLocation();
  const activeWordCount = useAppSelector(selectActiveWordCountByGroupsAndPages);

  return <GroupsPage baseUrl={pathname} wordCount={activeWordCount} />;
};

export default TextBookGroups;
