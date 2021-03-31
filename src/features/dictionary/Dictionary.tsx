import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
  selectDeletedSections,
  selectHardSections,
  selectSectorsReadyState,
} from 'features/sectors/sectorsSlice';

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

export default function Dictionary(): JSX.Element {
  const classes = useStyles();
  const sectorsReady = useSelector(selectSectorsReadyState);
  const hardSections = useSelector(selectHardSections);
  const deletedSections = useSelector(selectDeletedSections);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className="sector-title">Изучаемые слова</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NavLink to="/">
            <ListItemText className="page-title" primary="Перейти в раздел" />
          </NavLink>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className="sector-title">Сложные слова</Typography>
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
              {hardSections && hardSections.length ? (
                hardSections.map((page) => (
                  <div key={`${page.group}`} className="box">
                    <div className="schatten">
                      <NavLink to={page.url}>
                        <ListItemText
                          className="page-title"
                          primary={`Страница ${page.page + 1}`}
                        />
                      </NavLink>
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
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className="sector-title">Удаленные слова</Typography>
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
              {deletedSections && deletedSections.length ? (
                deletedSections.map((page) => (
                  <div key={`${page.group}`} className="box">
                    <div className="schatten">
                      <NavLink to={page.url}>
                        <ListItemText
                          className="page-title"
                          primary={`Страница ${page.page + 1}`}
                        />
                      </NavLink>
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
    </div>
  );
}
