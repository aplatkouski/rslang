import React, { useEffect } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import * as t from 'types';
import {
  getUserSpecialWords,
  getWords,
  getWordsLoadingStatus,
} from 'features/words/wordsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrUser } from 'features/user/userSlice';
import {
  selectAdjacentHardPages,
  selectAdjacentDeletedPages,
} from 'features/sectors/sectorsSlice';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { ListItemText, Typography, Button, CircularProgress } from '@material-ui/core';
import Settings from 'features/settings/Settings';
import WordCard from 'features/wordCard/WordCard';
import { makeStyles } from '@material-ui/core/styles';
import { SPECIAL_WORD_INDICATOR } from '../../constants';

import './HardOrDeletedWordsPage.scss';

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
  const dispatch = useDispatch();
  const currentUser: t.IUser = useSelector(getCurrUser);
  const adjacentPages: Array<t.ISpecialSection | undefined> = useSelector(
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
  const words = useSelector(getWords);
  const history = useHistory();
  const dataIsBeingLoaded = useSelector(getWordsLoadingStatus);

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

  let pageTitle;
  if (indicator === SPECIAL_WORD_INDICATOR.DEL) {
    pageTitle = 'Удаленные слова';
  } else if (indicator === SPECIAL_WORD_INDICATOR.HARD) {
    pageTitle = 'Сложные слова';
  }

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
          <Typography className={classes.sectorTitle}>{pageTitle}</Typography>
          <Typography className={classes.sectorTitle}>
            Раздел учебника {Number(sector) + 1}, страница раздела словаря{' '}
            {Number(page) + 1}
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
      )}
      <div
        className="word-cards-area"
        style={{ backgroundColor: decodeURIComponent(String(color)) }}
      >
        {words.map((word) => (
          <WordCard key={word.id} data={word} />
        ))}
      </div>
    </>
  );
}
