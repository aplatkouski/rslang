import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ListItemText, Typography } from '@material-ui/core';
import { selectAdjacentPages } from 'features/sectors/sectorsSlice';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import * as t from 'types';
import { getWords, loadWords } from 'features/words/wordsSlice';

import './SectionPage.scss';
import Settings from '../../features/settings/Settings';
import WordCard from '../../features/wordCard/WordCard';

export default function SectionPage(): JSX.Element {
  const { sector, page, color } = useParams<t.SectionPageParams>();
  const bgColor: string = color || 'white';

  const adjacentPages: Array<t.Page | undefined> = useSelector((state: any) =>
    selectAdjacentPages(state, { sectorNum: Number(sector), pageNum: Number(page) })
  );

  const dispatch = useDispatch();
  const words = useSelector(getWords);

  useEffect(() => {
    dispatch(loadWords(Number(sector), Number(page)));
  }, [dispatch, page, sector]);

  return (
    <>
      <div
        className="page-header"
        style={{ backgroundColor: decodeURIComponent(bgColor) }}
      >
        <Typography className="page-title">
          Раздел {Number(sector) + 1}, страница {Number(page) + 1}
        </Typography>
        <div className="pages-navigation">
          {adjacentPages && adjacentPages[0] && (
            <NavLink className="nav-page" to={adjacentPages[0].url}>
              <ArrowBackIos />
              <ListItemText className="page-title" primary={adjacentPages[0].title} />
            </NavLink>
          )}
          {adjacentPages && adjacentPages[1] && (
            <NavLink className="nav-page" to={adjacentPages[1].url}>
              <ListItemText className="page-title" primary={adjacentPages[1].title} />
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
        {words.map((word) => (
          <WordCard key={word.id} data={word} />
        ))}
      </div>
    </>
  );
}
