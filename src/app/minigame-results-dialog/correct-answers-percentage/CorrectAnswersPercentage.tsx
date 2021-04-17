import { Box, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IWordStatistic } from '../../../types';
import styles from './styles';

const TITLE_TEXT: string = 'Процент правильно указанных слов:';

interface Props extends WithStyles<typeof styles> {
  data: Array<Omit<IWordStatistic, 'id'>>;
  theme: Theme;
}

const CorrectAnswersPercentage = ({ classes, theme, data }: Props): JSX.Element => {
  const corrects: number = data.reduce((sum, { correctAnswerTotal }) => {
    return sum + correctAnswerTotal;
  }, 0);

  const total: number = data.reduce((sum, { correctAnswerTotal, wrongAnswerTotal }) => {
    return sum + correctAnswerTotal + wrongAnswerTotal;
  }, 0);

  const percentage = Math.round((corrects / total) * 100);

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
