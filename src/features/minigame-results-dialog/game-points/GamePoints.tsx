import { Box, Typography, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { selectBestSeriesByGame } from 'features/game-statistics/gameStatisticsSlice';
import { useAppSelector } from '../../../common/hooks';
import { IGameStatistic } from '../../../types';
import styles from './styles';

const TITLE_TEXT: string = 'Ваши очки/серия за игру:';
const THIS_GAME_TEXT: string = '- за эту игру - ';
const AVERAGE_PER_GAME_TEXT: string = '- в среднем, за игру - ';
const RECORD_PER_GAME_TEXT: string = '- ваш рекорд - ';

interface Props extends WithStyles<typeof styles> {
  data: IGameStatistic;
}

const GamePoints: React.FC<Props> = ({ classes, data }) => {
  const { gameId, bestSeries } = data;

  const bestSeriesGame = useAppSelector((state) => selectBestSeriesByGame(state, gameId));
  // const average = gameId;

  if (bestSeries === null || bestSeries === undefined) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Typography gutterBottom>{TITLE_TEXT}</Typography>
      <Typography>
        {THIS_GAME_TEXT}
        <span className={classes.result}>{bestSeries}</span>
      </Typography>
      <Typography>
        {AVERAGE_PER_GAME_TEXT}
        <span className={classes.result}>{bestSeriesGame?.bestSeries || bestSeries}</span>
      </Typography>
      <Typography>
        {RECORD_PER_GAME_TEXT}
        <span className={classes.result}>{bestSeriesGame?.bestSeries || bestSeries}</span>
      </Typography>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(GamePoints);
