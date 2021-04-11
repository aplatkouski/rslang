import {
  Box,
  Divider,
  Typography,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { GameResult } from './types';
import 'react-circular-progressbar/dist/styles.css';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  results: GameResult;
  theme: Theme;
}

const GameResultsFirstPage = ({ classes, theme, results }: Props): JSX.Element => {
  const { points, bestSeries } = results;

  const corrects: number = results.words.reduce((sum, { isCorrect }) => {
    return isCorrect ? sum + 1 : sum;
  }, 0);

  const percentage = Math.round((corrects / results.words.length) * 100);

  return (
    <>
      <Box className={classes.circularProgressbarContainer}>
        <Typography className={classes.title} gutterBottom>
          Процент правильно указанных слов:
        </Typography>
        <CircularProgressbar
          background
          backgroundPadding={theme.spacing(0.5)}
          className={classes.circularProgressbar}
          styles={buildStyles({
            backgroundColor: theme.palette.grey[200],
            textColor: theme.palette.primary.main,
            textSize: theme.spacing(3),
            pathColor: green[theme.palette.type === 'light' ? 200 : 700],
            trailColor: red[theme.palette.type === 'light' ? 200 : 700],
          })}
          text={`${percentage}%`}
          value={percentage}
        />
      </Box>

      <Divider className={classes.divider} />

      <Typography>{`Вы набрали очков за игру - ${points}`}</Typography>
      <Typography>{`Ваш средний результат за игру - ${points}`}</Typography>
      <Typography>{`Ваш рекорд за игру - ${points}`}</Typography>
      <Typography>{`Лушчая серия за игру - ${bestSeries}`}</Typography>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(GameResultsFirstPage);
