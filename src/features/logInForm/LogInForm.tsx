import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  getErrLogInMessage,
  getLoginStatus,
  logIn,
  status,
} from 'features/user/userSlice';
import React, { useRef } from 'react';

import 'styles/animate.min.css';
import './LogInForm.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

const LogInForm = ({
  isOpen,
  onClose: handleClose,
  onRegister: handleRegister,
}: Props): JSX.Element => {
  const refEmailField = useRef<HTMLInputElement>(null);
  const refPasswordField = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const errLogInMessage = useAppSelector(getErrLogInMessage);
  const logInStatus = useAppSelector(getLoginStatus);

  const handleLogInUser = () => {
    if (refEmailField.current && refPasswordField.current) {
      dispatch(
        logIn({
          email: refEmailField.current.value,
          password: refPasswordField.current.value,
        })
      );
    }
  };
  const handleKeyPressOnInput = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleLogInUser();
    }
  };

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        className="animate__animated animate__fadeInDownBig"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={isOpen}
      >
        <DialogTitle id="form-dialog-title">Войти в систему</DialogTitle>
        <DialogContent>
          {logInStatus === status.pending && <CircularProgress />}
          {errLogInMessage && (
            <Typography
              className="animate__animated animate__bounceInLeft error"
              gutterBottom
            >
              {errLogInMessage}
            </Typography>
          )}
          <FormControl fullWidth>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              autoFocus
              fullWidth
              id="email"
              inputRef={refEmailField}
              margin="dense"
              name="email"
              onKeyUp={handleKeyPressOnInput}
              type="text"
            />
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <Input
              fullWidth
              id="password"
              inputRef={refPasswordField}
              margin="dense"
              name="password"
              onKeyUp={handleKeyPressOnInput}
              type="password"
            />
          </FormControl>
          <DialogActions className="dlg-actions">
            <Button
              color="primary"
              disabled={logInStatus === status.fulfilled}
              onClick={handleClose}
            >
              Отмена
            </Button>
            <Button
              color="primary"
              disabled={!(logInStatus === status.idle)}
              onClick={handleLogInUser}
              type="submit"
              variant="outlined"
            >
              Войти
            </Button>
            <Button
              color="primary"
              disabled={!(logInStatus === status.idle)}
              onClick={handleRegister}
            >
              Зарегистрироваться
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogInForm;
