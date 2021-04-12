import { useAppDispatch, useAppSelector } from 'common/hooks';
import { selectActiveWordsForGame } from 'features/words/wordsSlice';
import React, { useEffect } from 'react';
import AudioCallGame from './audio-call-game/AudioCallGame';
import { startNewGame } from './gamesSlice';

const Game = (): JSX.Element => {
  const words = useAppSelector((state) =>
    selectActiveWordsForGame(state, { group: 1, page: 1 })
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      startNewGame({
        date: new Date().toISOString().substring(0, 10),
        gameId: '606744ee4c1b2097c2d7491f',
        words,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return <AudioCallGame />;
};

export default Game;
