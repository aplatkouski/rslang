import AudioCallGame from 'app/audio-call-game/AudioCallGame';
import MiniGameResultsDialog from 'app/minigame-results-dialog/MiniGameResultsDialog';
import MyGame from 'app/my-game/MyGame';
import SavannahGame from 'app/savannah-game/SavannahGame';
import { useAppDispatch, useAppParams, useAppSelector } from 'common/hooks';
import React, { useEffect, useState } from 'react';
import { IWord } from 'types';
import CircularIndeterminate from './circular-indeterminate/CircularIndeterminate';
import {
  finishGames,
  selectCurrentWord,
  selectGamesById,
  selectGameWords,
  selectIsCurrentGame,
  selectIsEndGame,
  startNewGame,
  upsertAllStatistic,
} from './gamesSlice';

interface Props {
  words: Array<IWord>;
}

const Game = ({ words }: Props): JSX.Element => {
  const { gameId } = useAppParams();
  const game = useAppSelector((state) => selectGamesById(state, gameId));
  const isCurrentGame = useAppSelector(selectIsCurrentGame);
  const isEndGame = useAppSelector(selectIsEndGame);

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
