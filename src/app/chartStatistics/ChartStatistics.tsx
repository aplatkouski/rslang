import React from 'react';
import Chart from 'app/charts/Chart';
import { useAppSelector } from 'common/hooks';
import {
  selectStudiedUserWordsCountByDate,
  selectStudiedWordsTotalCountByDate,
} from 'features/user-words/userWordsSlice';
import { CHART } from '../../constants';

const ChartStatistics = (): JSX.Element => {
  const studied = useAppSelector(selectStudiedUserWordsCountByDate);
  const totalStudied = useAppSelector(selectStudiedWordsTotalCountByDate);
  return (
    <>
      <Chart data={studied} title={CHART.DAILY_TITLE} />
      <Chart data={totalStudied} title={CHART.TOTAL_TITLE} />
    </>
  );
};

export default ChartStatistics;
