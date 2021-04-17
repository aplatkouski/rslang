import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Typography,
  withStyles,
} from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAppSelector } from 'common/hooks';
import { selectActiveWordCountByGroupsAndPages } from 'features/words/wordsSlice';
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styles/animate.min.css';
import { ROUTES } from '../../constants';
import './SectorsPage.scss';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  baseUrl?: string;
}

const SectionsPage = (props: Props): JSX.Element => {
  const { classes, baseUrl = ROUTES.textbook.url } = props;
  const activeWordCount = useAppSelector(selectActiveWordCountByGroupsAndPages);

  return (
    <div className={classes.root}>
      {Object.keys(activeWordCount).map((group) => (
        <Accordion key={group} disabled={!activeWordCount[group].total}>
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Typography
              className={`${classes.sectorTitle} sector-title animate__animated animate__backInRight`}
            >
              {`Раздел ${+group + 1}`}
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
              {activeWordCount[group] ? (
                Object.keys(activeWordCount[group])
                  .filter((page) => page !== 'total')
                  .map((page, pageIndex) => (
                    <div key={page} className="page-wrap">
                      {activeWordCount[group][page] ? (
                        <Link
                          component={NavLink}
                          to={`${baseUrl}/${group}/${page}`}
                          underline="none"
                        >
                          <button className="page-btn" type="button">
                            {`Страница ${pageIndex + 1}`}
                          </button>
                        </Link>
                      ) : (
                        <button className="page-btn-disabled" type="button">
                          {`Страница ${pageIndex + 1}`}
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
};

export default withStyles(styles, { withTheme: true })(SectionsPage);
