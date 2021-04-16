import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAppSelector } from 'common/hooks';
import { selectSectors } from 'features/sectors/sectorsSlice';
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styles/animate.min.css';
import * as t from 'types';

import './SectorsPage.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  sectorTitle: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function SectionsPage(): JSX.Element {
  const classes = useStyles();
  const sectors: Array<t.Sector> = useAppSelector(selectSectors);

  return (
    <div className={classes.root}>
      {sectors &&
        sectors.map((sector) => (
          <Accordion key={sector.key}>
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
                        <Link component={NavLink} to={page.url} underline="none">
                          <button className="page-btn" type="button">
                            {page.title}
                          </button>
                        </Link>
                      ) : (
                        <button className="page-btn-disabled" type="button">
                          {page.title}
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <Typography>Данный раздел пуст</Typography>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}
