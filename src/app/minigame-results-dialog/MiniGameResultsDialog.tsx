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
import styles from './styles';

const BUTTON_REPEAT_TEXT: string = 'повторить';
const BUTTON_EXIT_TEXT: string = 'закончить';
const DIALOG_TITLE_TEXT: string = 'Результат игры';

interface Props extends WithStyles<typeof styles> {
  onRepeat: () => void;
  onEnd: () => void;
}

const MiniGameResultsDialog = ({ classes, onRepeat, onEnd }: Props): JSX.Element => {
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);

  const handleRepeatGame = useCallback(() => {
    setOpen(false);
    onRepeat();
  }, [onRepeat]);

  const handleEndGame = useCallback(() => {
    onEnd();
    setOpen(false);
    if (window.history.length > 1) {
      history.goBack();
    } else {
      history.push(ROUTES.main.url);
    }
  }, [history, onEnd]);

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
      <MiniGameResults />
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
