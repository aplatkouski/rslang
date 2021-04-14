import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import 'styles/animate.min.css';

interface Props {
  gameHeader: string;
  gameRules: string;
  gameBtns: string;
  isOpen: boolean;
  onStartGame: () => void;
}

const StartNewGameDlg = ({
  gameHeader,
  gameRules,
  gameBtns,
  isOpen,
  onStartGame: handleStartGame,
}: Props): JSX.Element => {
  const history = useHistory();

  const handleGoBack = () => {
    if (history.length) {
      history.goBack();
    }
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      className="animate__animated animate__fadeInDownBig"
      fullWidth
      maxWidth="sm"
      open={isOpen}
    >
      <>
        <DialogTitle id="form-dialog-title">{gameHeader}</DialogTitle>
        <DialogContent>
          <Typography>{gameRules}</Typography>
          <Typography>{gameBtns}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleStartGame}
            type="submit"
            variant="outlined"
          >
            Начать игру
          </Button>
          <Button color="primary" onClick={handleGoBack} variant="outlined">
            Назад
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

export default StartNewGameDlg;
