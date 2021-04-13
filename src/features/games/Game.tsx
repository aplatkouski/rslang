import { useAppDispatch, useAppSelector } from 'common/hooks';
import AudioCallGame from 'features/audio-call-game/AudioCallGame';
import { selectActiveWordsForGame } from 'features/words/wordsSlice';
import React, { useEffect } from 'react';
import { selectCurrentWord, startNewGame, upsertAllStatistic } from './gamesSlice';
// import AudioCallGame from './audio-call-game/AudioCallGame';
import MyGame from './my-game/MyGame';

const Game = (): JSX.Element => {
  const words = useAppSelector((state) =>
    selectActiveWordsForGame(state, { group: 1, page: 1 })
  );
  const currentWord = useAppSelector(selectCurrentWord);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentWord && !words.length) {
      dispatch(upsertAllStatistic(null));
    }
  }, [currentWord, dispatch, words.length]);

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
<<<<<<< HEAD
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return currentWord ? <AudioCallGame word={currentWord} /> : <>{/* FINAL WINDOW */}</>;
=======
  return <MyGame />; // <AudioCallGame />;
>>>>>>> bbdb0d2 (refactor: make additional changes and add files for my game)
};

export default Game;
