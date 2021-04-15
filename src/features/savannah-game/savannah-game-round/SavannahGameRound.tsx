import {
  CardActions,
  Container,
  Button,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import Hotkeys from 'react-hot-keys';
import useSound from 'use-sound';
import FullScreenButton from 'app/full-screen-button/FullScreenButton';
import SoundButton from 'app/sound-button/SoundButton';
import loseGameSound from 'assets/sounds/lose.mp3';
import winGameSound from 'assets/sounds/win.mp3';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import shuffle from 'features/words/utils/shuffle';
import { response, setAttempts } from 'features/games/gamesSlice';
import { selectWrongTranslations } from 'features/words/wordsSlice';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { IWord } from '../../../types';
import styles from './styles';

const WRONG_WORDS_COUNT: number = 3;
const BEFORE_ANSWER_TIMER: number = 5000;
const AFTER_ANSWER_TIMER: number = 2000;

interface Props extends WithStyles<typeof styles> {
  word: IWord;
}

const SavannahGameRound: React.FC<Props> = ({ classes, word }) => {
  const dispatch = useAppDispatch();

  const wrongWords = useAppSelector((s) =>
    selectWrongTranslations(s, { wordId: word.id, count: WRONG_WORDS_COUNT })
  );

  const [correctSound] = useSound(winGameSound);
  const [errorSound] = useSound(loseGameSound);

  const [answerId, setAnswerId] = useState<string | null>(null);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);
  const [isSound, setIsSound] = useState<boolean>(true);

  const checkAnswer = useCallback(
    (answer, id) => {
      if (answer !== id) {
        dispatch(setAttempts(-1));
        if (isSound) {
          errorSound();
        }
      } else if (isSound) {
        correctSound();
      }
    },
    [dispatch, correctSound, errorSound, isSound]
  );

  useEffect(() => {
    let timerId: number | null;

    const setEndRound = () => {
      dispatch(
        response({
          correctAnswerTotal: answerId === word.id ? 1 : 0,
          wrongAnswerTotal: answerId !== word.id ? 1 : 0,
          studiedAt: new Date().toISOString().substring(0, 10),
        })
      );
    };

    if (!isAnswer) {
      timerId = window.setTimeout(() => {
        setEndRound();
        checkAnswer(answerId, word.id);
        setAnswerId(null);
        setIsAnswer(true);
      }, BEFORE_ANSWER_TIMER);
    } else {
      timerId = window.setTimeout(() => {
        setEndRound();
        setAnswerId(null);
        setIsAnswer(false);
      }, AFTER_ANSWER_TIMER);
    }

    return () => (timerId ? clearTimeout(timerId) : undefined);
  }, [isAnswer, dispatch, checkAnswer, answerId, word.id]);

  const getColor = useCallback(
    (id: string) => {
      if (isAnswer && answerId === null) {
        return id === word.id ? classes.success : classes.error;
      }
      if (isAnswer && (id === answerId || id === word.id)) {
        return id === word.id ? classes.success : classes.error;
      }
      return undefined;
    },
    [isAnswer, answerId, word.id, classes.success, classes.error]
  );

  const words = useMemo(() => shuffle([...wrongWords, word]), [word, wrongWords]);

  const handleClick = (id: string) => {
    setAnswerId(id);
    setIsAnswer(true);
    checkAnswer(id, word.id);
  };

  const toggleSound = () => {
    setIsSound((s) => !s);
  };

  const answers = words.map(({ wordTranslate, id }, idx) => (
    <Hotkeys
      key={id}
      keyName={`${idx + 1}`}
      onKeyDown={() => !isAnswer && handleClick(id)}
    >
      <Button
        className={clsx(classes.button, getColor(id))}
        color="primary"
        disabled={isAnswer}
        onClick={() => handleClick(id)}
        variant="outlined"
      >
        {`${idx + 1}. ${wordTranslate}`}
      </Button>
    </Hotkeys>
  ));

  return (
    <Container className={classes.root}>
      <FullScreenButton />
      <SoundButton handleClick={toggleSound} sound={isSound} />
      <Typography className={clsx(classes.word, !isAnswer && classes.blinker)}>
        {word.word}
      </Typography>
      <CardActions className={classes.answers}>{answers}</CardActions>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(SavannahGameRound);
