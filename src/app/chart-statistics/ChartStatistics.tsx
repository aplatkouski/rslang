import Chart from 'app/chart/Chart';
import { useAppSelector } from 'common/hooks';
import {
  selectWordCountByDateAsChartData,
  selectWordCountCumulativeByDateAsChartData,
} from 'features/user-words/userWordsSlice';
import React from 'react';

const ChartStatistics = (): JSX.Element => {
  const studied = useAppSelector(selectWordCountByDateAsChartData);
  const totalStudied = useAppSelector(selectWordCountCumulativeByDateAsChartData);
  return (
    <>
      <Chart
        data={studied}
        title="Статистика изученных (уникальных) слов за каждый день"
      />
      <Chart
        data={totalStudied}
        title="Статистика общего числа изученных слов за каждый день"
      />
    </>
  );
};

export default ChartStatistics;
