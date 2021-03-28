import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import { ICredentials, ILogInErrors } from 'Entities/user';
import React, { useRef } from 'react';
import { logIn } from 'features/user/userSlice';

// import 'Styles/animate.min.css';

import './LogInForm.scss';

interface Props {
  // logInErrors: ILogInErrors | undefined;
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
  // onLogIn: (credentials: ICredentials) => void;
}

const LogInForm = ({
  isOpen,
  onClose: handleClose,
  onRegister: handleRegister,
}: Props): JSX.Element => {
  const refEmailField = useRef<HTMLInputElement>(null);
  const refPasswordField = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleLogInUser = () => {
    if (refEmailField.current && refPasswordField.current) {
      /* onLogIn({
        login: refLoginField.current.value,
        password: refPasswordField.current.value,
      }); */
      dispatch(
        logIn({
          email: refEmailField.current.value,
          password: refPasswordField.current.value,
        })
      );
    }
  };
  /*
  const handleKeyPressOnInput = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleLogInUser();
    }
  };
*/

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
          {/*
          {logInErrors && logInErrors.general && (
            <Typography className="animate__animated animate__bounceInLeft" gutterBottom>
              {logInErrors.general}
            </Typography>
          )} */}
          <FormControl fullWidth>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              autoFocus
              fullWidth
              id="email"
              inputRef={refEmailField}
              margin="dense"
              name="email"
              type="text"
            />
            {/* logInErrors && logInErrors.login && (
              <Typography
                className="animate__animated animate__bounceInLeft"
                gutterBottom
              >
                {logInErrors.login}
              </Typography>
            ) */}
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
              type="password"
            />
            {/* logInErrors && logInErrors.password && (
              <Typography
                className="animate__animated animate__bounceInLeft"
                gutterBottom
              >
                {logInErrors.password}
              </Typography>
            ) */}
          </FormControl>
          <DialogActions className="dlg-actions">
            <Button color="primary" onClick={handleClose}>
              Отмена
            </Button>
            <Button color="primary" onClick={handleLogInUser}>
              Войти
            </Button>
            <Button color="primary" onClick={handleRegister}>
              Зарегистрироваться
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogInForm;
