import { Typography } from '@material-ui/core';
import React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppSelector } from '../../common/hooks';
import { getCurrUser } from '../../features/user/userSlice';
import { selectWordCountByDate } from '../../features/word-statistics/wordStatisticsSlice';
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
  const user = useAppSelector(getCurrUser);
  const stats = useAppSelector(selectWordCountByDate);
  const parseToValidData = (data: Report) => {
    const result: Array<ChartData> = [];
    Object.entries(data).map(([studiedAt, wordCount]) =>
      result.push({
        studiedAt,
        words: wordCount,
      })
    );
    return result.reverse();
  };
  const wordsPerDayArray = parseToValidData(stats);
  console.log(wordsPerDayArray);
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
  if (!user.userId) {
    return (
      <Typography variant="subtitle1">Авторизуйтесь, чтобы получать данные</Typography>
    );
  }
  return (
    <div>
      {wordsPerDayArray.length ? (
        <>
          <div className={classes.chart}>
            <LineChart
              data={wordsPerDayArray.reverse()}
              height={400}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              width={400}
            >
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line dataKey="words" stroke="#ff7300" type="monotone" yAxisId={0} />
              <XAxis dataKey="studiedAt" />
              <YAxis />
            </LineChart>
          </div>
          <div className={classes.chart}>
            <LineChart
              data={totalWordsArray}
              height={400}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              width={400}
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
