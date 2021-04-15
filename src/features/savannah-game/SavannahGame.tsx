import { Container, WithStyles, withStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useAppSelector, useAppDispatch } from 'common/hooks';
import React, { useEffect, useState } from 'react';
import {
  selectCurrentWord,
  selectAttempts,
  selectIsEndGame,
  setAttempts,
} from 'features/games/gamesSlice';
import SavannahGameRound from './savannah-game-round/SavannahGameRound';
import Timer from './timer/Timer';
import styles from './styles';

const TIMER: number = 5;

interface Props extends WithStyles<typeof styles> {}

const SavannahGame: React.FC<Props> = ({ classes }) => {
  const dispatch = useAppDispatch();

  const word = useAppSelector(selectCurrentWord);
  const attempts = useAppSelector(selectAttempts);
  const isEndGame = useAppSelector(selectIsEndGame);

  const [isTimer, setIsTimer] = useState<boolean>(true);

  useEffect(() => {
    dispatch(setAttempts(5));
  }, [dispatch]);

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

  return (
    <Container className={classes.root}>
      <Rating
        className={classes.rating}
        icon={<FavoriteIcon fontSize="inherit" />}
        name="attempts"
        readOnly
        value={attempts}
      />
      {word && !isEndGame ? <SavannahGameRound word={word} /> : null}
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(SavannahGame);
