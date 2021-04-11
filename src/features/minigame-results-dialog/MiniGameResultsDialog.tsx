import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants';
import MiniGameResults from './MiniGameResults';
import { GameResult } from './types';
import styles from './styles';

const BUTTON_REPEAT_TEXT: string = 'повторить';
const BUTTON_EXIT_TEXT: string = 'закончить';
const DIALOG_TITLE_TEXT: string = 'Результат игры';

// данные уточнить ---------------------------------------
const results: GameResult = {
  gameID: '606744ee4c1b2097c2d7491f',
  points: 60,
  bestSeries: 320,
  words: [
    {
      wordID: '5e9f5ee35eb9e72bc21afa40',
      isCorrect: false,
    },
    {
      wordID: '5e9f5ee35eb9e72bc21afa04',
      isCorrect: true,
    },
    {
      wordID: '5e9f5ee35eb9e72bc21afbf8',
      isCorrect: false,
    },
    {
      wordID: '5e9f5ee35eb9e72bc21af887',
      isCorrect: true,
    },
    {
      wordID: '5e9f5ee35eb9e72bc21afaf4',
      isCorrect: true,
    },
  ],
};
// данные уточнить ---------------------------------------

interface Props extends WithStyles<typeof styles> {
  // results: GameResult;
  onRepeat: () => void;
}

const MiniGameResultsDialog = ({ classes, onRepeat }: Props): JSX.Element => {
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);

  const handleRepeatGame = useCallback(() => {
    setOpen(false);
    onRepeat();
  }, [onRepeat]);

  const handleEndGame = useCallback(() => {
    setOpen(false);
    if (window.history.length > 1) {
      history.goBack();
    } else {
      history.push(ROUTES.main);
    }
  }, [history]);

  return (
    <Dialog
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleEndGame}
      open={open}
    >
      <DialogTitle>{DIALOG_TITLE_TEXT}</DialogTitle>
      <Divider className={classes.divider} />
      <MiniGameResults results={results} />
      <Divider className={classes.divider} />

      <DialogActions className={classes.buttonsGroup}>
        <Button
          aria-label="repeat game"
          color="primary"
          onClick={handleRepeatGame}
          variant="contained"
        >
          {BUTTON_REPEAT_TEXT}
        </Button>
        <Button
          aria-label="exit game"
          color="primary"
          onClick={handleEndGame}
          variant="contained"
        >
          {BUTTON_EXIT_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(MiniGameResultsDialog);
