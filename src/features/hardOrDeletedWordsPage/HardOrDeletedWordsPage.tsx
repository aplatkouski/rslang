import { CircularProgress, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import AttentionButton from 'app/./attentionButton/AttentionButton';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  selectAdjacentDeletedPages,
  selectAdjacentHardPages,
} from 'features/sectors/sectorsSlice';
import Settings from 'features/settings/Settings';
import { getCurrUser } from 'features/user/userSlice';
import WordCard from 'features/wordCard/WordCard';
import {
  getUserSpecialWords,
  getWords,
  getWordsLoadingStatus,
} from 'features/words/wordsSlice';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import * as t from 'types';
import { SPECIAL_WORD_INDICATOR, WORD_OPTIONAL_MODE } from '../../constants';

import './HardOrDeletedWordsPage.scss';

const specialWordIndicatorValues = Object.values(SPECIAL_WORD_INDICATOR);
type SpecialWordIndicatorValues = typeof specialWordIndicatorValues[number];
const isCardVisible = (
  optional: t.IWordOptions | undefined,
  indicator: SpecialWordIndicatorValues | undefined
): boolean =>
  (optional?.deleted && indicator === SPECIAL_WORD_INDICATOR.DEL) ||
  (optional?.mode === WORD_OPTIONAL_MODE.hard &&
    !optional?.deleted &&
    indicator === SPECIAL_WORD_INDICATOR.HARD);

const useStyles = makeStyles((theme) => ({
  sectorTitle: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
  },
}));

export default function HardOrDeletedWordsPage(): JSX.Element {
  const {
    indicator,
    sector,
    page,
    dbRefPage,
    color,
  } = useParams<t.ISpecialSectionPageParams>();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const currentUser: t.IUser = useAppSelector(getCurrUser);
  const adjacentPages: Array<t.ISpecialSection | undefined> = useAppSelector(
    (state: any) => {
      if (indicator === SPECIAL_WORD_INDICATOR.HARD) {
        return selectAdjacentHardPages(state, {
          sectorNum: Number(sector),
          pageNum: Number(page),
        });
      }
      return selectAdjacentDeletedPages(state, {
        sectorNum: Number(sector),
        pageNum: Number(page),
      });
    }
  );
  const words = useAppSelector(getWords);
  const history = useHistory();
  const dataLoadStatus: t.IWordsStatus = useAppSelector(getWordsLoadingStatus);
  // loadProcessLaunched нужен для того, чтобы в коде, где рендериться компонент, определить,
  // побывали ли мы до этого в useEffect. Если не делать этой проверки, то рендеринг не дожидается
  // загрузки данных в useEffect и срабатывает не так, как хочется
  const [loadProcessLaunched, setLoadProcessLaunched] = useState(false);

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
    setLoadProcessLaunched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.token, dbRefPage, indicator, sector]);

  let pageTitle;
  if (indicator === SPECIAL_WORD_INDICATOR.DEL) {
    pageTitle = 'Удаленные слова';
  } else if (indicator === SPECIAL_WORD_INDICATOR.HARD) {
    pageTitle = 'Сложные слова';
  }

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

  return (
    <>
      <div
        className="page-header"
        style={{ backgroundColor: decodeURIComponent(String(color)) }}
      >
        <Typography className={classes.sectorTitle}>{pageTitle}</Typography>
        <Typography className={classes.sectorTitle}>
          Раздел учебника {Number(sector) + 1}
        </Typography>
        <Typography className={classes.sectorTitle}>
          Страница раздела словаря {Number(page) + 1}
        </Typography>
        <div className="pages-navigation">
          {adjacentPages && adjacentPages[0] && (
            <NavLink className="nav-page" to={adjacentPages[0].url}>
              <ArrowBackIos />
              <ListItemText
                className="page-title"
                primary={`К странице ${adjacentPages[0].page + 1}`}
              />
            </NavLink>
          )}
          &nbsp; &nbsp; &nbsp;
          {adjacentPages && adjacentPages[1] && (
            <NavLink className="nav-page" to={adjacentPages[1].url}>
              <ListItemText
                className="page-title"
                primary={`К странице ${adjacentPages[1].page + 1}`}
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
        style={{ backgroundColor: decodeURIComponent(String(color)) }}
      >
        {words.map(
          (word) =>
            isCardVisible(word.optional, indicator) && (
              <WordCard key={word.id} word={word} />
            )
        )}
      </div>
    </>
  );
}
