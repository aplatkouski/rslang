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

import { initialStats, STATISTIC_KEY } from '../../constants';
import * as t from '../../types';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const StatisticPage = ({ classes }: Props): JSX.Element => {
  const data = localStorage.getItem(STATISTIC_KEY);
  const stats: Array<t.MiniGameStats> = data ? JSON.parse(data) : initialStats;
  const totalStats = {
    name: 'Всего',
    words: 0,
    answers: 0,
    correctAnswers: 0,
    series: '-',
  };
  return (
    <div className={classes.container}>
      <Typography variant="h3">Статистика за сегодня</Typography>
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
            {stats.map((stat: t.MiniGameStats) => {
              totalStats.words += stat.words;
              totalStats.correctAnswers += stat.correctAnswers;
              totalStats.answers += stat.answers;
              return (
                <TableRow key={stat.name}>
                  <TableCell component="th" scope="row">
                    {stat.name}
                  </TableCell>
                  <TableCell align="center">{stat.words}</TableCell>
                  <TableCell align="center">{`${Math.floor(
                    Math.floor((stat.correctAnswers / stat.answers) * 100) || 0
                  )}%`}</TableCell>
                  <TableCell align="center">{stat.series}</TableCell>
                </TableRow>
              );
            })}
            <TableRow key="Всего">
              <TableCell component="th" scope="row">
                {totalStats.name}
              </TableCell>
              <TableCell align="center">{totalStats.words}</TableCell>
              <TableCell align="center">{`${Math.floor(
                Math.floor((totalStats.correctAnswers / totalStats.answers) * 100) || 0
              )}%`}</TableCell>
              <TableCell align="center">{totalStats.series}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(StatisticPage);
