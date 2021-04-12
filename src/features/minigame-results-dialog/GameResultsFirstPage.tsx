import React from 'react';
import CorrectAnswersPercentage from './correct-answers-percentage/CorrectAnswersPercentage';
import GamePoints from './game-points/GamePoints';
// import { useAppSelector } from '../../common/hooks';
import { gameResults } from './mocha-data';

const GameResultsFirstPage: React.FC = () => {
  // const results = useAppSelector((state) => state.gameStatistics.current);
  const { current } = gameResults;

  if (!current) {
    return null;
  }

  const { wordStatistics, gameStatistic } = current;

  return (
    <>
      <CorrectAnswersPercentage data={wordStatistics} />
      <GamePoints data={gameStatistic} />
    </>
  );
};

export default GameResultsFirstPage;
