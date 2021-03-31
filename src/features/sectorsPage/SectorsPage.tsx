import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
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

import './SectorsPage.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
              <Typography className="sector-title">{sector.title}</Typography>
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
                      <div key={page.key} className="box">
                        <div className="schatten">
                          {page.show ? (
                            <NavLink to={page.url}>
                              <ListItemText className="page-title" primary={page.title} />
                            </NavLink>
                          ) : (
                            <ListItemText className="page-title" primary={page.title} />
                          )}
                        </div>
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
      <Accordion key="dic" style={{ backgroundColor: 'white' }}>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className="sector-title">Словарь</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Dictionary />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
