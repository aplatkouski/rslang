import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  List,
  ListItem,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import WordRecord from './word-record/WordRecord';
import styles from './styles';

const BUTTON_REPEAT_TEXT = 'повторить';
const BUTTON_EXIT_TEXT = 'закончить';
const CORRECT_TEXT = 'Верно';
const ERROR_TEXT = 'Неверно';

interface Props extends WithStyles<typeof styles> {
  // word: IWord;
  // userWord?: IUserWord;
  onRepeat: () => void;
}

const MiniGameResultDialog = ({ classes, onRepeat }: Props) => {
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);

  const handleRepeatGame = useCallback(() => {
    setOpen(false);
    onRepeat();
  }, [onRepeat]);

  const handleEndGame = useCallback(() => {
    setOpen(false);
    history.goBack();
  }, [history]);

  const correct = [2, 5, 7, 15, 46, 84];
  const error = [1, 6, 105, 97];

  const getList = (items: Array<number>, isCorrect: boolean = true): JSX.Element => (
    <>
      <Typography className={classes.title}>
        {isCorrect ? CORRECT_TEXT : ERROR_TEXT}&nbsp;
        <span
          className={clsx(classes.answer, isCorrect ? classes.correct : classes.error)}
        >
          {items.length}
        </span>
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item} className={classes.listItem}>
            <WordRecord />
          </ListItem>
        ))}
      </List>
    </>
  );

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
      <DialogContent className={classes.content}>
        {correct && getList(correct)}
        {correct && error && <Divider className={classes.divider} />}
        {error && getList(error, false)}
      </DialogContent>

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

export default withStyles(styles, { withTheme: true })(MiniGameResultDialog);
