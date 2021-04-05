import { CircularProgress, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import AttentionButton from 'app/./attentionButton/AttentionButton';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { selectAdjacentPages } from 'features/sectors/sectorsSlice';
import Settings from 'features/settings/Settings';
import { getCurrUser } from 'features/user/userSlice';
import WordCard from 'features/wordCard/WordCard';
import {
  areAllWordsDeleted,
  getWords,
  getWordsLoadingStatus,
  loadWords,
} from 'features/words/wordsSlice';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import * as t from 'types';

import './SectionPage.scss';

const useStyles = makeStyles((theme) => ({
  sectorTitle: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
  },
}));

export default function SectionPage(): JSX.Element {
  const classes = useStyles();
  const { sector, page, color } = useParams<t.SectionPageParams>();
  const bgColor: string = color || 'white';
  const adjacentPages: Array<t.Page | undefined> = useAppSelector((state: any) =>
    selectAdjacentPages(state, { sectorNum: Number(sector), pageNum: Number(page) })
  );
  const dispatch = useAppDispatch();
  const words = useAppSelector(getWords);
  const currentUser: t.IUser = useAppSelector(getCurrUser);
  const dataLoadStatus: t.IWordsStatus = useAppSelector(getWordsLoadingStatus);
  const history = useHistory();
  const allWordsDeleted = useAppSelector(areAllWordsDeleted);
  // loadProcessLaunched нужен для того, чтобы в коде, где рендериться компонент, определить,
  // побывали ли мы до этого в useEffect. Если не делать этой проверки, то рендеринг не дожидается
  // загрузки данных в useEffect и срабатывает не так, как хочется
  const [loadProcessLaunched, setLoadProcessLaunched] = useState(false);

  useEffect(() => {
    dispatch(
      loadWords(Number(sector), Number(page), currentUser.userId, currentUser.token)
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

  // Слова загружены, но все в состоянии "удаленное"
  if (dataLoadStatus.loaded && allWordsDeleted) {
    handleGoToBook();
  }

  return (
    <>
      <div
        className="page-header"
        style={{ backgroundColor: decodeURIComponent(bgColor) }}
      >
        <Typography className={classes.sectorTitle}>
          Раздел {Number(sector) + 1}, страница {Number(page) + 1}
        </Typography>
        <div className="pages-navigation">
          {adjacentPages && adjacentPages[0] && (
            <NavLink className="nav-page" to={adjacentPages[0].url}>
              <ArrowBackIos />
              <ListItemText
                className={classes.sectorTitle}
                primary={adjacentPages[0].title}
              />
            </NavLink>
          )}
          &nbsp; &nbsp; &nbsp;
          {adjacentPages && adjacentPages[1] && (
            <NavLink className="nav-page" to={adjacentPages[1].url}>
              <ListItemText
                className={classes.sectorTitle}
                primary={adjacentPages[1].title}
              />
              <ArrowForwardIos />
            </NavLink>
          )}
        </div>
        <div className="settings">
          <Settings />
        </div>
      </div>
      <div
        className="word-cards-area"
        style={{ backgroundColor: decodeURIComponent(bgColor) }}
      >
        {words.map(
          (word) => !word.optional?.deleted && <WordCard key={word.id} word={word} />
        )}
      </div>
    </>
  );
}
