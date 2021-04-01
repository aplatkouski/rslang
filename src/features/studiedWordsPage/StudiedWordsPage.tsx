import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as t from 'types';
import {
  loadStudiedWords,
  getWords,
  getWordsLoadingStatus,
} from 'features/words/wordsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrUser } from 'features/user/userSlice';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import Settings from 'features/settings/Settings';
import WordCard from 'features/wordCard/WordCard';
import { makeStyles } from '@material-ui/core/styles';

import './StudiedWordsPage.scss';

const useStyles = makeStyles((theme) => ({
  sectorTitle: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
  },
}));

export default function StudiedWordsPage(): JSX.Element {
  const { sector, page, color } = useParams<t.SectionPageParams>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser: t.IUser = useSelector(getCurrUser);
  const words = useSelector(getWords);
  const history = useHistory();
  const dataIsBeingLoaded = useSelector(getWordsLoadingStatus);

  useEffect(() => {
    dispatch(
      loadStudiedWords(
        Number(sector),
        Number(page),
        currentUser.userId,
        currentUser.token
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.token, sector, page]);

  const handleGoToBook = () => {
    history.push('/sectors');
  };

  // Проверка "!words || !words.length" позволяет красиво выйти из ситуации, когда
  // пользователь выходит/входит в систему, находясь на этой странице, да еще и под
  // несколькими аккаунтами
  return !words || !words.length ? (
    <Button onClick={handleGoToBook}>Перейти к учебнику</Button>
  ) : (
    <>
      {dataIsBeingLoaded ? (
        <CircularProgress />
      ) : (
        <div
          className="page-header"
          style={{ backgroundColor: decodeURIComponent(String(color)) }}
        >
          <Typography className={classes.sectorTitle}>Изучаемые слова</Typography>
          <Typography className={classes.sectorTitle}>
            Раздел учебника {Number(sector) + 1}
          </Typography>
          <Typography className={classes.sectorTitle}>
            Страница раздела {Number(page) + 1}
          </Typography>
          <div className="settings">
            <Settings />
          </div>
        </div>
      )}
      <div
        className="word-cards-area"
        style={{ backgroundColor: decodeURIComponent(String(color)) }}
      >
        {!dataIsBeingLoaded &&
          words.map((word) => <WordCard key={word.id} data={word} />)}
      </div>
    </>
  );
}
