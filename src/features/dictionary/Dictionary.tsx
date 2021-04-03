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
  selectStudiedSections,
} from 'features/sectors/sectorsSlice';
import {
  STUDIED_WORDS_SECTOR_COLOR,
  HARD_WORDS_SECTOR_COLOR,
  DELETED_WORDS_SECTOR_COLOR,
} from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  sectorTitle: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    '&:hover': {
      fontSize: theme.typography.pxToRem(20),
    },
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
  const studiedSections = useSelector(selectStudiedSections);

  return (
    <div className={classes.root}>
      <Accordion style={{ backgroundColor: `${STUDIED_WORDS_SECTOR_COLOR}` }}>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className={classes.sectorTitle}>Изучаемые слова</Typography>
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
              {studiedSections && studiedSections.length ? (
                studiedSections.map((page) => (
                  <div key={`${page.sectorNum}${page.pageNum}`} className="box">
                    <div className="schatten">
                      <NavLink to={page.url}>
                        <ListItemText
                          className={classes.sectorTitle}
                          primary={`Раздел ${page.sectorNum + 1}, страница ${
                            page.pageNum + 1
                          }, слов: ${page.count}`}
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
      <Accordion style={{ backgroundColor: `${HARD_WORDS_SECTOR_COLOR}` }}>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className={classes.sectorTitle}>Сложные слова</Typography>
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
      <Accordion style={{ backgroundColor: `${DELETED_WORDS_SECTOR_COLOR}` }}>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className={classes.sectorTitle}>Удаленные слова</Typography>
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
