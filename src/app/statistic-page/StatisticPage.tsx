import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
} from '@material-ui/core';
import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../../common/hooks';
import { selectBestSeriesByGames } from '../../features/game-statistics/gameStatisticsSlice';

import {
  selectWordStatisticsByGame,
  selectWordTotalStatistics,
} from '../../features/word-statistics/wordStatisticsSlice';
import * as t from '../../types';
import ChartStatistics from '../chartStatistics/ChartStatistics';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const StatisticPage = ({ classes }: Props): JSX.Element => {
  const gameStatistics = useAppSelector(selectWordStatisticsByGame);
  const totalStatistics = useAppSelector(selectWordTotalStatistics);
  const bestSeries = useAppSelector(selectBestSeriesByGames);
  console.log(bestSeries);
  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h3">
        Статистика за сегодня
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Игра</TableCell>
              <TableCell align="center">Изучено слов</TableCell>
              <TableCell align="center">Правильно&nbsp;(%)</TableCell>
              <TableCell align="center">Самая длинная серия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameStatistics.map((stat: t.IStatisticsData) => {
              return (
                <TableRow key={stat.name}>
                  <TableCell component="th" scope="row">
                    {stat.name}
                  </TableCell>
                  <TableCell align="center">{stat.totalStudied}</TableCell>
                  <TableCell align="center">{`${
                    stat.correctAnswersPercentage || 0
                  }%`}</TableCell>
                  <TableCell align="center">{0}</TableCell>
                </TableRow>
              );
            })}
            <TableRow key="Всего">
              <TableCell component="th" scope="row">
                Всего
              </TableCell>
              <TableCell align="center">{totalStatistics.totalStudied}</TableCell>
              <TableCell align="center">{`${
                totalStatistics.correctAnswersPercentage || 0
              }%`}</TableCell>
              <TableCell align="center">-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography className={classes.title} variant="h3">
        Долгосрочная статистика
      </Typography>
      <ChartStatistics />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(StatisticPage);
