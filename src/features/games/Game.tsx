import { useAppDispatch, useAppParams, useAppSelector } from 'common/hooks';
import AudioCallGame from 'features/audio-call-game/AudioCallGame';
import MyGame from 'features/my-game/MyGame';
import SavannahGame from 'features/savannah-game/SavannahGame';
import MiniGameResultsDialog from 'features/minigame-results-dialog/MiniGameResultsDialog';
import { selectActiveWordsForGame } from 'features/words/wordsSlice';
import React, { useEffect, useState } from 'react';
import CircularIndeterminate from './circular-indeterminate/CircularIndeterminate';
import {
  selectCurrentWord,
  selectGamesById,
  selectGameWords,
  selectIsCurrentGame,
  selectIsEndGame,
  startNewGame,
  finishGames,
  upsertAllStatistic,
} from './gamesSlice';

const Game = (): JSX.Element => {
  const { gameId } = useAppParams();
  const game = useAppSelector((state) => selectGamesById(state, gameId));
  const isCurrentGame = useAppSelector(selectIsCurrentGame);
  const isEndGame = useAppSelector(selectIsEndGame);
  const words = useAppSelector((state) =>
    selectActiveWordsForGame(state, { group: 1, page: 1 })
  );
  const gameWords = useAppSelector(selectGameWords);
  const currentWord = useAppSelector(selectCurrentWord);
  const dispatch = useAppDispatch();

  const [isStatReady, setIsStatReady] = useState<boolean>(false);

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

  useEffect(() => {
    if ((isCurrentGame && !currentWord && !gameWords.length) || isEndGame) {
      dispatch(upsertAllStatistic(null))
        .then(() => setIsStatReady(true))
        .catch(() => {});
    }
  }, [isCurrentGame, currentWord, dispatch, gameWords.length, isEndGame]);

  const handleRepeatGame = () => {
    setIsStatReady(false);
    dispatch(
      startNewGame({
        date: new Date().toISOString().substring(0, 10),
        gameId,
        words,
      })
    );
  };

  const handleEndGames = () => {
    setIsStatReady(false);
    dispatch(finishGames());
  };

  if (isStatReady) {
    return <MiniGameResultsDialog onEnd={handleEndGames} onRepeat={handleRepeatGame} />;
  }

  if (isCurrentGame) {
    if (game && currentWord) {
      if (game.name.localeCompare('Аудиовызов') === 0) {
        return <AudioCallGame word={currentWord} />;
      }

      if (game.name.localeCompare('Своя игра') === 0) {
        return <MyGame word={currentWord} />;
      }

      if (game.name.localeCompare('Саванна') === 0) {
        return <SavannahGame />;
      }
    }
  }

  return <CircularIndeterminate />;
};

export default Game;
