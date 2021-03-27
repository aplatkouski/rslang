import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';
import * as t from 'types';
import {
  api,
  USER_REGISTRATION_API,
  SERVER_OK_STATUS,
  WRONG_REGISTRATION_MESSAGE,
  SUCCESSFUL_REGISTRATION_MESSAGE,
  TRY_REGISTRATION_AGAIN_MESSAGE,
} from '../../constants';

import 'styles/animate.min.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationForm = ({ isOpen, onClose: handleClose }: Props): JSX.Element => {
  const [registrationInProgress, setRegistrationInProgress] = useState(false);
  const [registrationErrors, setRegistrationErrors] = useState<t.IRegistrationErrors>({
    general: null,
    email: null,
    name: null,
    password: null,
  });
  const [successMess, setSuccessfulMessage] = useState<string | null>(null);
  const [chosenFileName, setChosenFileName] = useState<string | null | undefined>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const loadHiddenTextFieldRef = useRef<HTMLInputElement>(null);

  const handleCloseDialog = () => {
    // Закрыть окно регистрации не получится, пока запущенный процесс регистрации
    // не будет завершен
    if (!registrationInProgress) {
      setRegistrationErrors({
        name: null,
        email: null,
        password: null,
        general: null,
      });
      setSuccessfulMessage(null);
      setChosenFileName(null);
      handleClose();
    }
  };

  const handleRegisterUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(formRef.current || undefined);

    setRegistrationInProgress(true);
    try {
      const response = await fetch(`${api}/${USER_REGISTRATION_API}`, {
        method: 'POST',
        body: formData,
      });

      const content = await response.json();

      if (response.status !== SERVER_OK_STATUS) {
        const errors: t.IRegistrationErrors = {
          general: `${WRONG_REGISTRATION_MESSAGE}. ${TRY_REGISTRATION_AGAIN_MESSAGE}`,
          email: null,
          name: null,
          password: null,
        };

        if (content.error && content.error.errors) {
          for (let i = 0; i < content.error.errors.length; i += 1) {
            const err = content.error.errors[i];
            let errFieldName: string;
            if (err.path && Array.isArray(err.path) && err.path.length) {
              [errFieldName] = err.path;

              if (Object.keys(errors).includes(errFieldName)) {
                errors[errFieldName] = err.message;
              }
            }
          }
        }

        setRegistrationErrors({ ...registrationErrors, ...errors });
      } else {
        setSuccessfulMessage(SUCCESSFUL_REGISTRATION_MESSAGE);
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        setRegistrationErrors({
          ...registrationErrors,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          general: `${String(error.message)}. ${TRY_REGISTRATION_AGAIN_MESSAGE}`,
          name: null,
          email: null,
          password: null,
        });
      }
    }
    setRegistrationInProgress(false);
  };

  const handleFileNameChange = () => {
    if (loadHiddenTextFieldRef && loadHiddenTextFieldRef.current) {
      setChosenFileName(loadHiddenTextFieldRef.current.value);
    }
  };

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      className="animate__animated animate__fadeInDownBig"
      fullWidth
      maxWidth="sm"
      onClose={handleCloseDialog}
      open={isOpen}
    >
      {!successMess ? (
        <>
          <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
          <DialogContent>
            {registrationErrors.general && (
              <Typography
                className="animate__animated animate__bounceIn error"
                gutterBottom
              >
                {registrationErrors.general}
              </Typography>
            )}
            <form
              ref={formRef}
              encType="muplipart/form-data"
              method="POST"
              onSubmit={handleRegisterUser}
            >
              {registrationInProgress && <CircularProgress />}
              <TextField
                autoFocus
                fullWidth
                id="name"
                label="Ваше имя"
                margin="dense"
                name="name"
                type="text"
              />
              {registrationErrors.name && (
                <Typography
                  className="animate__animated animate__bounceInLeft error"
                  gutterBottom
                >
                  {registrationErrors.name}
                </Typography>
              )}
              <TextField
                fullWidth
                id="email"
                label="email"
                margin="dense"
                name="email"
                type="text"
              />
              {registrationErrors.email && (
                <Typography
                  className="animate__animated animate__bounceInLeft error"
                  gutterBottom
                >
                  {registrationErrors.email}
                </Typography>
              )}
              <TextField
                fullWidth
                id="password"
                label="Пароль"
                margin="dense"
                name="password"
                type="password"
              />
              {registrationErrors.password && (
                <Typography
                  className="animate__animated animate__bounceInLeft error"
                  gutterBottom
                >
                  {registrationErrors.password}
                </Typography>
              )}
              <Button
                color="primary"
                onClick={() => {
                  if (loadHiddenTextFieldRef && loadHiddenTextFieldRef.current) {
                    loadHiddenTextFieldRef.current.click();
                  }
                }}
              >
                Загрузить фото (png/jpg/jpeg, max 10Мб)
              </Button>
              <Typography>{chosenFileName}</Typography>
              <input
                ref={loadHiddenTextFieldRef}
                name="filedata"
                onChange={handleFileNameChange}
                style={{ display: 'none' }}
                type="file"
              />
              <DialogActions>
                <Button
                  color="primary"
                  disabled={registrationInProgress}
                  onClick={handleCloseDialog}
                >
                  Отмена
                </Button>
                <Button
                  color="primary"
                  disabled={registrationInProgress}
                  type="submit"
                  variant="outlined"
                >
                  Зарегистрироваться
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle id="form-dialog-title">{successMess}</DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={handleCloseDialog} variant="outlined">
              Закрыть
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default RegistrationForm;
