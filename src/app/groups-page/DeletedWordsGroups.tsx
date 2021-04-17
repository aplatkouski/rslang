import { useAppSelector } from 'common/hooks';
import { selectDeletedWordCountByGroupsAndChunks } from 'features/user-words/userWordsSlice';
import React from 'react';
import { useLocation } from 'react-router-dom';
import GroupsPage from './GroupsPage';

const DeletedWordsGroups = (): JSX.Element => {
  const { pathname } = useLocation();
  const wordCount = useAppSelector(selectDeletedWordCountByGroupsAndChunks);

  return <GroupsPage baseUrl={pathname} wordCount={wordCount} />;
};

export default DeletedWordsGroups;
