import {
  Divider,
  List,
  ListItem,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import WordRecord from './word-record/WordRecord';
import { GameResult } from './types';
import styles from './styles';

const CORRECT_TEXT: string = 'Верно';
const ERROR_TEXT: string = 'Неверно';

interface Props extends WithStyles<typeof styles> {
  results: GameResult;
}

const GameResultsSecondPage = ({ classes, results }: Props): JSX.Element => {
  const corrects = useMemo(
    () => results.words.filter(({ isCorrect }) => isCorrect).map(({ wordId }) => wordId),
    [results.words]
  );

  const errors = useMemo(
    () => results.words.filter(({ isCorrect }) => !isCorrect).map(({ wordId }) => wordId),
    [results.words]
  );

  const getList = (items: Array<string>, isCorrects: boolean = true): JSX.Element => (
    <>
      <Typography className={classes.title}>
        {isCorrects ? CORRECT_TEXT : ERROR_TEXT}&nbsp;
        <span
          className={clsx(classes.answer, isCorrects ? classes.correct : classes.error)}
        >
          {items.length}
        </span>
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item} className={classes.listItem}>
            <WordRecord id={item} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {corrects.length && getList(corrects)}
      {corrects.length && errors.length && <Divider className={classes.divider} />}
      {errors.length && getList(errors, false)}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(GameResultsSecondPage);
