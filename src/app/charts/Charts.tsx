import { Typography } from '@material-ui/core';
import React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppSelector } from '../../common/hooks';
import { selectStudiedUserWordsCountByDate } from '../../features/user-words/userWordsSlice';
import { selectCredentials } from '../../features/user/userSlice';
import styles from './styles';

type Props = WithStyles<typeof styles>;

interface Report {
  [studiedAt: string]: number;
}

interface ChartData {
  studiedAt: string;
  words: number;
}

const Charts = ({ classes }: Props): JSX.Element => {
  const user = useAppSelector(selectCredentials);
  const studied = useAppSelector(selectStudiedUserWordsCountByDate);
  const parseToValidData = (data: Report) => {
    const result: Array<ChartData> = [];
    Object.entries(data).map(([studiedAt, wordCount]) =>
      result.push({
        studiedAt: studiedAt.substring(0, 10),
        words: wordCount,
      })
    );
    return result.sort(
      (prev, next) => Number(prev.studiedAt.slice(-2)) - Number(next.studiedAt.slice(-2))
    );
  };
  const wordsPerDayArray = parseToValidData(studied);
  const aggregateTotalStatistics = (array: Array<ChartData>) => {
    const reversedArray = array.reverse();
    const result: Array<ChartData> = [];
    reversedArray.forEach((item: ChartData, idx: number, arr: Array<ChartData>) => {
      const totalWords = arr
        .slice(idx)
        .reduce((acc: number, cur: ChartData) => acc + cur.words, 0);
      result.push({
        studiedAt: item.studiedAt,
        words: totalWords,
      });
    });
    return result.reverse();
  };
  const totalWordsArray = aggregateTotalStatistics(wordsPerDayArray);
  if (!user) {
    return (
      <Typography className={classes.chartTitle} variant="subtitle1">
        Авторизуйтесь, чтобы получать данные
      </Typography>
    );
  }
  return (
    <div>
      {wordsPerDayArray.length ? (
        <>
          <div className={classes.chart}>
            <Typography className={classes.chartTitle} variant="subtitle1">
              Ваш прогресс по дням
            </Typography>
            <LineChart
              data={wordsPerDayArray.reverse()}
              height={400}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              width={480}
            >
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line dataKey="words" stroke="#ff7300" type="monotone" yAxisId={0} />
              <XAxis dataKey="studiedAt" />
              <YAxis />
            </LineChart>
          </div>
          <div className={classes.chart}>
            <Typography className={classes.chartTitle} variant="subtitle1">
              Общее число изученных слов за каждый день
            </Typography>
            <LineChart
              data={totalWordsArray}
              height={400}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              width={480}
            >
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line dataKey="words" stroke="#ff7300" type="monotone" yAxisId={0} />
              <XAxis dataKey="studiedAt" />
              <YAxis />
            </LineChart>
          </div>
        </>
      ) : (
        <Typography variant="h5">Данных пока нет</Typography>
      )}
    </div>
  );
};
export default withStyles(styles, { withTheme: true })(Charts);
