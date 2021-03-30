import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as t from 'types';
import {
  loadStudiedWords,
  getWords,
  getWordsLoadingStatus,
} from 'features/words/wordsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrUser } from 'features/user/userSlice';
import { Typography, CircularProgress } from '@material-ui/core';
import Settings from 'features/settings/Settings';
import WordCard from 'features/wordCard/WordCard';
import { makeStyles } from '@material-ui/core/styles';
import AttentionButton from 'app/./attentionButton/AttentionButton';

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
  const dataLoadStatus: t.IWordsStatus = useSelector(getWordsLoadingStatus);
  // loadProcessLaunched нужен для того, чтобы в коде, где рендериться компонент, определить,
  // побывали ли мы до этого в useEffect. Если не делать этой проверки, то рендеринг не дожидается
  // загрузки данных в useEffect и срабатывает не так, как хочется
  const [loadProcessLaunched, setLoadProcessLaunched] = useState(false);

  useEffect(() => {
    dispatch(
      loadStudiedWords(
        Number(sector),
        Number(page),
        currentUser.userId,
        currentUser.token
      )
    );
    setLoadProcessLaunched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.token, sector, page]);

  const handleGoToBook = () => {
    history.push('/sectors');
  };

  // Идет загрузка слов ...
  if (!loadProcessLaunched || dataLoadStatus.loading) {
    return <CircularProgress />;
  }

  // Ошибка загрузки слов
  if (dataLoadStatus.loadError) {
    return (
      <div>
        <p className="err-mess">{dataLoadStatus.loadError}</p>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <AttentionButton btnTitle="Перейти к учебнику" handleClick={handleGoToBook} />
      </div>
    );
  }

  // Слова загружены, но их массив оказался пуст
  if (dataLoadStatus.loaded && (!words || !words.length)) {
    handleGoToBook();
  }

  // Проверка "!words || !words.length" позволяет красиво выйти из ситуации, когда
  // пользователь выходит/входит в систему, находясь на этой странице, да еще и под
  // несколькими аккаунтами
  if (!words || !words.length) {
    // eslint-disable-next-line react/jsx-handler-names
    return <AttentionButton btnTitle="Перейти к учебнику" handleClick={handleGoToBook} />;
  }

  return (
    <>
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
      <div
        className="word-cards-area"
        style={{ backgroundColor: decodeURIComponent(String(color)) }}
      >
        {words.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </>
  );
}
