import { Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { IChartData } from 'types';
import styles from './styles';

type Props = WithStyles<typeof styles>;

interface ChartProps extends Props {
  title: string;
  data: Array<IChartData>;
}

const Chart = ({ classes, data, title }: ChartProps): JSX.Element => {
  return data.length ? (
    <div className={classes.chartBlock}>
      <Typography className={classes.chartTitle} variant="subtitle1">
        {title}
      </Typography>
      <LineChart
        data={data}
        height={400}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        width={400}
      >
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line dataKey="words" stroke="#ff7300" type="monotone" yAxisId={0} />
        <XAxis dataKey="studiedAt" />
        <YAxis />
      </LineChart>
    </div>
  ) : (
    <Typography variant="h5">Данных пока нет</Typography>
  );
};
export default withStyles(styles, { withTheme: true })(Chart);
