import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
  Box,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectSectors } from 'features/sectors/sectorsSlice';
import * as t from 'types';
import { Settings } from '../../app/settings/settings';

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
              <Box
                alignItems="stretch"
                css={{ maxWidth: '100%' }}
                display="flex"
                flexWrap="wrap"
                justifyContent="space-evenly"
              >
                {sector.pages &&
                  sector.pages.map((page) => (
                    <div key={page.key} className="box">
                      <div className="schatten">
                        <NavLink to={page.url}>
                          <ListItemText className="page-title" primary={page.title} />
                        </NavLink>
                      </div>
                    </div>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      <Settings />
    </div>
  );
}
