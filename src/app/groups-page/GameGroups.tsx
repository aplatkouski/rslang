import {
  Accordion,
  AccordionSummary,
  Link,
  Typography,
  withStyles,
} from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles';
import { useAppSelector } from 'common/hooks';
import { selectActiveWordCountByGroupsAndPages } from 'features/words/wordsSlice';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import 'styles/animate.min.css';
import { IWordCountByGroupsAndPages } from 'types';
import { PAGES_PER_GROUP } from '../../constants';
import './GroupsPage.scss';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const GameGroups = ({ classes }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const wordCount: IWordCountByGroupsAndPages = useAppSelector(
    selectActiveWordCountByGroupsAndPages
  );
  return (
    <div className={classes.root}>
      {Object.keys(wordCount).map((group) => (
        <Accordion key={group} disabled={!wordCount[group].total}>
          <Link
            component={NavLink}
            to={`${pathname}/${group}/${PAGES_PER_GROUP - 1}`}
            underline="none"
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              expandIcon={null}
              id="panel1a-header"
            >
              <Typography
                className={`${classes.groupTitle} group-title animate__animated animate__backInRight`}
              >
                {`Раздел ${+group + 1}`}
              </Typography>
            </AccordionSummary>
          </Link>
        </Accordion>
      ))}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(GameGroups);
