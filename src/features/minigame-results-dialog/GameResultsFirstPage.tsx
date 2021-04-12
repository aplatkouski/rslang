import React from 'react';
import CorrectAnswersPercentage from './correct-answers-percentage/CorrectAnswersPercentage';
import GamePoints from './game-points/GamePoints';
import { GameResult } from './types';

interface Props {
  results: GameResult;
}

const GameResultsFirstPage = ({ results }: Props): JSX.Element => {
  const { words, ...data } = results;

  return (
    <>
      <CorrectAnswersPercentage words={words} />
      <GamePoints data={data} />
    </>
  );
};

export default GameResultsFirstPage;
