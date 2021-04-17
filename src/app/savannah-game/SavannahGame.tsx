import { Box, Container, WithStyles, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  selectAttempts,
  selectCurrentWord,
  selectGameRounds,
  selectIsEndGame,
  setAttempts,
} from 'features/games/gamesSlice';
import React, { useEffect, useState } from 'react';
import SavannahGameRound from './savannah-game-round/SavannahGameRound';
import styles from './styles';
import Timer from './timer/Timer';

const TIMER: number = 5;

interface Props extends WithStyles<typeof styles> {}

const SavannahGame: React.FC<Props> = ({ classes }) => {
  const dispatch = useAppDispatch();

  const word = useAppSelector(selectCurrentWord);
  const attempts = useAppSelector(selectAttempts);
  const isEndGame = useAppSelector(selectIsEndGame);
  const { total, current } = useAppSelector(selectGameRounds);

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

  return word && !isEndGame ? (
    <Container className={classes.root}>
      <Box className={classes.rating}>
        <Rating
          icon={<FavoriteIcon fontSize="inherit" />}
          name="attempts"
          readOnly
          value={attempts}
        />
        <Rating max={total} name="rounds" readOnly value={current} />
      </Box>
      <SavannahGameRound word={word} />
    </Container>
  ) : null;
};

export default withStyles(styles, { withTheme: true })(SavannahGame);
