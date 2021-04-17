import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { useAppSelector } from 'common/hooks';
import { selectBestSeriesByDate } from 'features/game-statistics/gameStatisticsSlice';
import { selectAllGames } from 'features/games/gamesSlice';
import {
  selectWordCountByDateAsChartData,
  selectWordCountCumulativeByDateAsChartData,
} from 'features/user-words/userWordsSlice';
import {
  selectCorrectAnswerPercentByDate,
  selectCorrectAnswerPercentByGamesAndDate,
  selectStudiedWordsByDate,
  selectStudiedWordsByGamesAndDate,
} from 'features/word-statistics/wordStatisticsSlice';
import React, { useEffect, useState } from 'react';
import Chart from './chart/Chart';
import styles from './styles';

interface GameStat {
  name: string;
  bestSeries: number;
  correctAnswerPercent: number;
  studiedWordCount: number;
}

type Props = WithStyles<typeof styles>;

const StatisticPage = ({ classes }: Props): JSX.Element => {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    if (date.localeCompare(new Date().toISOString().substring(0, 10)) !== 0) {
      setDate(new Date().toISOString().substring(0, 10));
    }
  }, [date]);

  const games = useAppSelector(selectAllGames);

  const bestSeriesByGames = useAppSelector((state) =>
    selectBestSeriesByDate(state, { date })
  );

  const correctAnswerPercentByGames = useAppSelector((state) =>
    selectCorrectAnswerPercentByGamesAndDate(state, { studiedAt: date })
  );

  const studiedWordCountByGames = useAppSelector((state) =>
    selectStudiedWordsByGamesAndDate(state, { studiedAt: date })
  );

  const gameStats: Array<GameStat> = games.map((game) => ({
    name: game.name,
    bestSeries: bestSeriesByGames[game.id] || 0,
    correctAnswerPercent: correctAnswerPercentByGames[game.id] || 0,
    studiedWordCount: studiedWordCountByGames[game.id] || 0,
  }));

  const studiedWordCountTotal = useAppSelector((state) =>
    selectStudiedWordsByDate(state, { studiedAt: date })
  );

  const correctAnswerPercentTotal = useAppSelector((state) =>
    selectCorrectAnswerPercentByDate(state, { studiedAt: date })
  );

  const studied = useAppSelector(selectWordCountByDateAsChartData);
  const totalStudied = useAppSelector(selectWordCountCumulativeByDateAsChartData);

  return (
    <Container className={classes.container} maxWidth="lg">
      <Typography align="center" className={classes.header} component="h3" variant="h4">
        Статистика за сегодня
      </Typography>
      <TableContainer className={classes.tablecontainer}>
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
            {gameStats.map((gameStat: GameStat) => (
              <TableRow key={gameStat.name}>
                <TableCell component="th" scope="row">
                  {gameStat.name}
                </TableCell>
                <TableCell align="center">{gameStat.studiedWordCount}</TableCell>
                <TableCell align="center">{`${gameStat.correctAnswerPercent}%`}</TableCell>
                <TableCell align="center">{gameStat.bestSeries}</TableCell>
              </TableRow>
            ))}
            <TableRow key="Всего">
              <TableCell component="th" scope="row">
                Всего
              </TableCell>
              <TableCell align="center">{studiedWordCountTotal}</TableCell>
              <TableCell align="center">{`${correctAnswerPercentTotal || 0}%`}</TableCell>
              <TableCell align="center" />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography align="center" className={classes.header} component="h3" variant="h4">
        Долгосрочная статистика
      </Typography>
      <Chart
        data={studied}
        title="Статистика изученных (уникальных) слов за каждый день"
      />
      <Chart
        data={totalStudied}
        title="Статистика общего числа изученных слов за каждый день"
      />
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(StatisticPage);
