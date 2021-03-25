import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ListItemText, Typography } from '@material-ui/core';
import { getAdjacentPages, Page } from 'app/sectors/sectorsSlice';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

import './SectionPage.scss';

type SectionPageParams = {
  sector?: string;
  page?: string;
  color?: string;
};

export default function SectionPage(): JSX.Element {
  const { sector, page, color } = useParams<SectionPageParams>();
  const bgColor: string = color || 'white';

  const adjacentPages: Array<Page | undefined> = useSelector((state: any) =>
    getAdjacentPages(state, { sectorNum: Number(sector), pageNum: Number(page) })
  );

  return (
    <div style={{ backgroundColor: decodeURIComponent(bgColor) }}>
      <Typography className="page-header">
        Раздел {Number(sector) + 1}, страница {page}
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
    </div>
  );
}
