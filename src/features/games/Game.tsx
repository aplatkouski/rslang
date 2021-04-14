import { useAppDispatch, useAppParams, useAppSelector } from 'common/hooks';
import AudioCallGame from 'features/audio-call-game/AudioCallGame';
import MyGame from 'features/my-game/MyGame';
import { selectActiveWordsForGame } from 'features/words/wordsSlice';
import React, { useEffect } from 'react';
import {
  selectCurrentWord,
  selectGamesById,
  startNewGame,
  upsertAllStatistic,
} from './gamesSlice';

const Game = (): JSX.Element => {
  const { gameId } = useAppParams();
  const game = useAppSelector((state) => selectGamesById(state, gameId));
  const words = useAppSelector((state) =>
    selectActiveWordsForGame(state, { group: 1, page: 1 })
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      startNewGame({
        date: new Date().toISOString().substring(0, 10),
        gameId,
        words,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const currentWord = useAppSelector(selectCurrentWord);

  useEffect(() => {
    if (!currentWord && !words.length) {
      dispatch(upsertAllStatistic(null));
    }
  }, [currentWord, dispatch, words.length]);

  if (game && currentWord) {
    if (game.name.localeCompare('Аудиовызов') === 0) {
      return <AudioCallGame word={currentWord} />;
    }

    if (game.name.localeCompare('Своя игра') === 0) {
      return <MyGame words={words} />;
    }
  }
  return <>FINAL WINDOW</>;
};

export default Game;
