import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSectors,
  selectSectorsReadyState,
  updatePagesVisibility,
} from 'features/sectors/sectorsSlice';
import * as t from 'types';
import Dictionary from 'features/dictionary/Dictionary';
import { getCurrUser } from 'features/user/userSlice';
import { DICTIONARY_SECTOR_COLOR } from '../../constants';

import './SectorsPage.scss';
import 'styles/animate.min.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  sectorTitle: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function SectionsPage(): JSX.Element {
  const classes = useStyles();
  const sectors: Array<t.Sector> = useSelector(selectSectors);
  const currentUser: t.IUser = useSelector(getCurrUser);
  const dispatch = useDispatch();
  const sectorsReady = useSelector(selectSectorsReadyState);

  useEffect(() => {
    dispatch(updatePagesVisibility(currentUser.userId, currentUser.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.token]);

  return (
    <div className={classes.root}>
      {sectors &&
        sectors.map((sector) => (
          <Accordion key={sector.key} style={{ backgroundColor: sector.color }}>
            <AccordionSummary
              aria-controls="panel1a-content"
              expandIcon={<ExpandMoreIcon />}
              id="panel1a-header"
            >
              <Typography
                className={`${classes.sectorTitle} sector-title animate__animated animate__backInRight`}
              >
                {sector.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {!sectorsReady ? (
                <CircularProgress />
              ) : (
                <Box
                  alignItems="stretch"
                  css={{ maxWidth: '100%' }}
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-evenly"
                >
                  {sector.pages && sector.pages.length ? (
                    sector.pages.map((page) => (
                      <div key={page.key} className="page-wrap">
                        {page.show ? (
                          <NavLink style={{ textDecoration: 'none' }} to={page.url}>
                            <button className="page-btn" type="button">
                              {page.title}
                            </button>
                          </NavLink>
                        ) : (
                          <button className="page-btn-disabled" type="button">
                            {page.title}
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <Typography className="sector-title">Данный раздел пуст</Typography>
                  )}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      {currentUser && currentUser.token && (
        <Accordion key="dic" style={{ backgroundColor: `${DICTIONARY_SECTOR_COLOR}` }}>
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Typography
              className={`${classes.sectorTitle} sector-title animate__animated animate__backInRight`}
            >
              Словарь
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Dictionary />
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
