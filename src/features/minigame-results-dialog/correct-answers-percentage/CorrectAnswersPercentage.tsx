import { Box, Typography, Theme, WithStyles, withStyles } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { IWordResult } from '../types';
import 'react-circular-progressbar/dist/styles.css';
import styles from './styles';

const TITLE_TEXT: string = 'Процент правильно указанных слов:';

interface Props extends WithStyles<typeof styles> {
  words: Array<IWordResult>;
  theme: Theme;
}

const CorrectAnswersPercentage = ({ classes, theme, words }: Props): JSX.Element => {
  const corrects: number = words.reduce((sum, { isCorrect }) => {
    return isCorrect ? sum + 1 : sum;
  }, 0);

  const percentage = Math.round((corrects / words.length) * 100);

  return (
    <Box className={classes.root}>
      <Typography gutterBottom>{TITLE_TEXT}</Typography>

      <CircularProgressbar
        background
        backgroundPadding={theme.spacing(0.5)}
        className={classes.progressbar}
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
  );
};

export default withStyles(styles, { withTheme: true })(CorrectAnswersPercentage);
