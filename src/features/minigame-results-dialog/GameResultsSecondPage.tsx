import { List, ListItem, Typography, WithStyles, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import WordRecord from './word-record/WordRecord';
// import { useAppSelector } from '../../common/hooks';
import { gameResults } from './mocha-data';
import styles from './styles';

type Title = 'Верно: ' | 'Неверно: ' | 'С ошибками: ';
type Answer = 'correct' | 'error' | 'mistake';
const answers: Array<Answer> = ['correct', 'error', 'mistake'];
const titles: Array<Title> = ['Верно: ', 'Неверно: ', 'С ошибками: '];

interface Props extends WithStyles<typeof styles> {}

const GameResultsSecondPage: React.FC<Props> = ({ classes }) => {
  // const results = useAppSelector((state) => state.gameStatistics.current);
  const { current } = gameResults;

  if (!current) {
    return null;
  }

  const { wordStatistics } = current;

  const corrects = wordStatistics
    .filter(
      ({ correctAnswerTotal, wrongAnswerTotal }) =>
        !wrongAnswerTotal && correctAnswerTotal
    )
    .map(({ wordId }) => wordId);

  const errors = wordStatistics
    .filter(
      ({ correctAnswerTotal, wrongAnswerTotal }) =>
        !correctAnswerTotal && wrongAnswerTotal
    )
    .map(({ wordId }) => wordId);

  const mistakes = wordStatistics
    .filter(
      ({ correctAnswerTotal, wrongAnswerTotal }) => correctAnswerTotal && wrongAnswerTotal
    )
    .map(({ wordId }) => wordId);

  const mapAnswerToProps = {
    [answers[0]]: { style: classes.correct, text: titles[0] },
    [answers[1]]: { style: classes.error, text: titles[1] },
    [answers[2]]: { style: classes.mistake, text: titles[2] },
  };

  const getStyle = (answer: Answer): string => {
    return mapAnswerToProps[answer].style;
  };

  const getTitle = (answer: Answer): string => {
    return mapAnswerToProps[answer].text;
  };

  const getList = (items: Array<string>, answer: Answer): JSX.Element => (
    <>
      <Typography className={clsx(classes.title, getStyle(answer))}>
        {getTitle(answer)}
        {items.length}
      </Typography>
      <List className={classes.list}>
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
      {corrects.length ? getList(corrects, answers[0]) : null}
      {errors.length ? getList(errors, answers[1]) : null}
      {mistakes.length ? getList(mistakes, answers[2]) : null}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(GameResultsSecondPage);
