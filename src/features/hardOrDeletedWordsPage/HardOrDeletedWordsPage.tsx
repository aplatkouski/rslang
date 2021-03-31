import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as t from 'types';
import { getUserSpecialWords } from 'features/words/wordsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrUser } from 'features/user/userSlice';

export default function HardOrDeletedWordsPage(): JSX.Element {
  const {
    indicator,
    sector,
    page,
    dbRefPage,
    color,
  } = useParams<t.ISpecialSectionPageParams>();
  const dispatch = useDispatch();
  const currentUser: t.IUser = useSelector(getCurrUser);

  useEffect(() => {
    dispatch(
      getUserSpecialWords(
        Number(sector),
        Number(dbRefPage),
        currentUser.userId,
        currentUser.token,
        String(indicator)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.token, dbRefPage, indicator, sector]);

  return <div>{`${indicator}, ${sector}, ${page}, ${dbRefPage}, ${color}`}</div>;
}
