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
    return result;
  };
  const wordsPerDayArray = parseToValidData(stats);
  if (!user.userId) {
    return (
      <Typography variant="subtitle1">Авторизуйтесь, чтобы получать данные</Typography>
    );
  }
  return (
    <div className={classes.chart}>
      {wordsPerDayArray.length ? (
        <LineChart
          data={wordsPerDayArray}
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
      ) : (
        <Typography variant="h5">Пока нет данных</Typography>
      )}
    </div>
  );
};
export default withStyles(styles, { withTheme: true })(Charts);
