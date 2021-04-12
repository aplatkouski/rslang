import React from 'react';
import { selectCurrentGameStatistic } from 'features/games/gamesSlice';
import CorrectAnswersPercentage from './correct-answers-percentage/CorrectAnswersPercentage';
import GamePoints from './game-points/GamePoints';
import { useAppSelector } from '../../common/hooks';

const GameResultsFirstPage: React.FC = () => {
  const statistic = useAppSelector(selectCurrentGameStatistic);

  if (!statistic) {
    return null;
  }

  const { wordStatistics, gameStatistic } = statistic;

  return (
    <>
      <CorrectAnswersPercentage data={wordStatistics} />
      <GamePoints data={gameStatistic} />
    </>
  );
};

export default GameResultsFirstPage;
