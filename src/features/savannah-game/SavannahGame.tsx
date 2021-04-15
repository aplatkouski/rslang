import { Container, LinearProgress, WithStyles, withStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAppSelector, useAppDispatch } from 'common/hooks';
import React, { useEffect, useState } from 'react';
import MiniGameResultsDialog from 'features/minigame-results-dialog/MiniGameResultsDialog';
import {
  selectCurrentWord,
  upsertAllStatistic,
  selectAttempts,
  setAttempts,
} from 'features/games/gamesSlice';
import SavannahGameRound from './savannah-game-round/SavannahGameRound';
import { IWord } from '../../types';
import Timer from './timer/Timer';
import styles from './styles';

const TIMER: number = 5;

interface Props extends WithStyles<typeof styles> {
  words: Array<IWord>;
}

const SavannahGame: React.FC<Props> = ({ classes, words }) => {
  console.log(words);
  const dispatch = useAppDispatch();

  const word = useAppSelector(selectCurrentWord);
  const attempts = useAppSelector(selectAttempts);

  const [isTimer, setIsTimer] = useState<boolean>(true);
  const [isEndGame, setIsEndGame] = useState<boolean>(false);
  // const [isProgress, setIsProgress] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setAttempts(5));
  }, [dispatch]);

  // useEffect(() => {
  //   if (!word || attempts === 0) {
  //     setIsProgress(true);
  //   }
  // }, [word, attempts]);

  useEffect(() => {
    if ((!word && !isEndGame) || (attempts === 0 && !isEndGame)) {
      dispatch(upsertAllStatistic(null))
        .then(() => setIsEndGame(true))
        .catch(() => setIsEndGame(true));
    }
  }, [word, isEndGame, attempts, dispatch]);

  const handleRepeatGame = () => {
    setIsTimer(true);
    setIsEndGame(false);
    // setIsProgress(false);
    // dispatch(repeatGame({ date: new Date().toISOString().substring(0, 10), words }));
  };

  const handleEndTimer = () => {
    setIsTimer(false);
  };

  if (isTimer) {
    return (
      <Container className={classes.root}>
        <Timer onEnd={handleEndTimer} timer={TIMER} />
      </Container>
    );
  }

  if (isEndGame) {
    return (
      <Container className={classes.root}>
        <MiniGameResultsDialog onRepeat={handleRepeatGame} />
      </Container>
    );
  }

  if (!word || attempts === 0) {
    return (
      <Container className={classes.root}>
        <LinearProgress
          aria-busy
          aria-describedby="save-statistics"
          className={classes.progress}
          color="secondary"
        />
      </Container>
    );
  }

  return word ? (
    <Container className={classes.root}>
      <Rating
        className={classes.rating}
        icon={<FavoriteIcon fontSize="inherit" />}
        name="attempts"
        readOnly
        value={attempts || 0}
      />
      <SavannahGameRound word={word} />
    </Container>
  ) : null;
};

export default withStyles(styles, { withTheme: true })(SavannahGame);
