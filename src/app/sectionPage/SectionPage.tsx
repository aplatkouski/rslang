import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ListItemText, Typography, CircularProgress } from '@material-ui/core';
import { selectAdjacentPages } from 'features/sectors/sectorsSlice';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import * as t from 'types';
import { getWords, loadWords, getWordsLoadingStatus } from 'features/words/wordsSlice';
import { getCurrUser } from 'features/user/userSlice';
import Settings from 'features/settings/Settings';
import WordCard from 'features/wordCard/WordCard';
import { makeStyles } from '@material-ui/core/styles';

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
  const adjacentPages: Array<t.Page | undefined> = useSelector((state: any) =>
    selectAdjacentPages(state, { sectorNum: Number(sector), pageNum: Number(page) })
  );
  const dispatch = useDispatch();
  const words = useSelector(getWords);
  const currentUser: t.IUser = useSelector(getCurrUser);
  const dataIsBeingLoaded = useSelector(getWordsLoadingStatus);

  useEffect(() => {
    dispatch(
      loadWords(Number(sector), Number(page), currentUser.userId, currentUser.token)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.token, sector, page]);

  return (
    <>
      {dataIsBeingLoaded ? (
        <CircularProgress />
      ) : (
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
      )}
      <div
        className="word-cards-area"
        style={{ backgroundColor: decodeURIComponent(bgColor) }}
      >
        {!dataIsBeingLoaded &&
          words.map((word) => <WordCard key={word.id} data={word} />)}
      </div>
    </>
  );
}
