import { Button, Grid, WithStyles, withStyles } from '@material-ui/core';
import { ArrowRightAlt as ArrowRightAltIcon } from '@material-ui/icons';
import FullScreenButton from 'app/full-screen-button/FullScreenButton';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  choose,
  pickWord,
  processResponse,
  selectChoice,
} from 'features/games/gamesSlice';
import { selectWrongTranslations } from 'features/words/wordsSlice';
import React, { useCallback, useState } from 'react';
import Hotkeys from 'react-hot-keys';
import { IWord } from 'types';
import styles from './styles';
import TranslateChips from './translate-chip/TranslateChips';
import Volume from './volume/Volume';

interface Props extends WithStyles<typeof styles> {
  word: IWord;
}

const AudioCallGame = ({ classes, word }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isSkipped, setIsSkipped] = useState(false);
  const wrongTranslations = useAppSelector((state) =>
    selectWrongTranslations(state, { wordId: word.id })
  );
  const selectedWord = useAppSelector(selectChoice);

  const handleButton = useCallback(() => {
    if (selectedWord) {
      if (isSkipped) {
        dispatch(pickWord());
      } else {
        dispatch(
          processResponse({
            correctAnswerTotal: selectedWord === word ? 1 : 0,
            wrongAnswerTotal: selectedWord !== word ? 1 : 0,
            studiedAt: new Date().toISOString().substring(0, 10),
          })
        );
      }
      setIsSkipped(false);
    } else {
      dispatch(choose(word));
      setIsSkipped(true);
    }
  }, [dispatch, isSkipped, selectedWord, word]);

  return (
    <div className={classes.gameField}>
      <FullScreenButton />
      <Grid
        alignItems="center"
        className={classes.root}
        container
        direction="column"
        justify="center"
      >
        <Grid item>
          <Volume />
        </Grid>
        <Grid item>
          <TranslateChips correctWord={word} wrongWords={wrongTranslations} />
        </Grid>
        <Grid item>
          <Hotkeys keyName=" " onKeyDown={handleButton}>
            <Button className={classes.button} onClick={handleButton} variant="outlined">
              {selectedWord ? <ArrowRightAltIcon /> : 'Не знаю'}
            </Button>
          </Hotkeys>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AudioCallGame);
