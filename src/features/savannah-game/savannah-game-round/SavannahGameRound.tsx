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
import { useAppDispatch, useAppSelector } from 'common/hooks';
import shuffle from 'features/words/utils/shuffle';
import { response, setAttempts } from 'features/games/gamesSlice';
import { selectWrongTranslations } from 'features/words/wordsSlice';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { IWord } from '../../../types';
import styles from './styles';

const WRONG_WORDS_COUNT: number = 3;

interface Props extends WithStyles<typeof styles> {
  word: IWord;
}

const SavannahGameRound: React.FC<Props> = ({ classes, word }) => {
  const dispatch = useAppDispatch();

  const wrongWords = useAppSelector((s) =>
    selectWrongTranslations(s, { wordId: word.id, count: WRONG_WORDS_COUNT })
  );

  const [answerId, setAnswerId] = useState<string | null>(null);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);

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
      if (answerId !== word.id) {
        dispatch(setAttempts(-1));
      }
      setAnswerId(null);
      setIsAnswer(false);
    };

    if (!isAnswer) {
      timerId = window.setTimeout(() => {
        setEndRound();
      }, 3000);
    } else {
      timerId = window.setTimeout(() => {
        setEndRound();
      }, 1000);
    }
    return () => (timerId ? clearTimeout(timerId) : undefined);
  }, [isAnswer, dispatch, answerId, word.id]);

  const getColor = useCallback(
    (id: string) => {
      if (!isAnswer || answerId !== id) {
        return undefined;
      }
      return id === word.id ? classes.success : classes.error;
    },
    [isAnswer, answerId, word.id, classes.success, classes.error]
  );

  const words = useMemo(() => shuffle([...wrongWords, word]), [word, wrongWords]);

  const handleClick = (id: string) => {
    setAnswerId(id);
    setIsAnswer(true);
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
      <Typography className={classes.word}>{word.word}</Typography>
      <CardActions>{answers}</CardActions>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(SavannahGameRound);
