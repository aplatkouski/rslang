import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectActiveWordsForGame } from 'features/words/wordsSlice';
import React from 'react';
import { ISelectProps } from 'types';
import Game from './Game';

const GameTextbook = (): JSX.Element => {
  const { group, page } = useAppParams();
  const selectProps: ISelectProps = {
    group: extractRouterParam(group, 0),
    page: extractRouterParam(page, 29),
  };
  const words = useAppSelector((state) => selectActiveWordsForGame(state, selectProps));

  return <Game words={words} />;
};

export default GameTextbook;
