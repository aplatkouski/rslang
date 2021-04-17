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
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'styles/animate.min.css';
import { IWordCountByGroupsAndPages } from 'types';
import './GroupsPage.scss';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  baseUrl: string;
  wordCount: IWordCountByGroupsAndPages;
}

const GroupsPage = ({ classes, baseUrl, wordCount }: Props): JSX.Element => (
  <div className={classes.root}>
    {Object.keys(wordCount).map((group) => (
      <Accordion key={group} disabled={!wordCount[group].total}>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography
            className={`${classes.groupTitle} group-title animate__animated animate__backInRight`}
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
            {wordCount[group] ? (
              Object.keys(wordCount[group])
                .filter((page) => page !== 'total')
                .map((page, pageIndex) => (
                  <div key={page} className="page-wrap">
                    {wordCount[group][page] ? (
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

export default withStyles(styles, { withTheme: true })(GroupsPage);
