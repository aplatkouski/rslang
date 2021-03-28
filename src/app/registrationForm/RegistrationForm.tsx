import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';
// import 'Styles/animate.min.css';
import * as t from 'types';
import { api, USER_REGISTRATION_API } from '../../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
/*
interface IResponse {
  errors: Array<{ param: keyof t.IRegistrationErrors; msg: string }>;
  message: string;
}
*/
const RegistrationForm = ({ isOpen, onClose: handleClose }: Props): JSX.Element => {
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
    setRegistrationErrors({
      name: null,
      email: null,
      password: null,
      general: null,
    });
    setSuccessfulMessage(null);
    handleClose();
  };

  const handleRegisterUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setRegistrationErrors({
      name: null,
      email: null,
      password: null,
      general: null,
    });

    const formData = new FormData(formRef.current || undefined);

    try {
      const response = await fetch(`${api}/${USER_REGISTRATION_API}`, {
        method: 'POST',
        body: formData,
      });

      console.log(response.json());
      /*
      const body: IResponse = (await response.json()) as IResponse;

      if (response.status !== 201) {
        const errors: t.IRegistrationErrors = {
          general: body.message,
          email: null,
          name: null,
          password: null,
        };

        if (body.errors && body.errors.length) {
          for (let i = 0; i < body.errors.length; i += 1) {
            const err = body.errors[i];
            if (Object.keys(errors).includes(err.param)) {
              errors[err.param] = err.msg;
            }
          }
        }
        setRegistrationErrors({ ...registrationErrors, ...errors });
      } else {
        setSuccessfulMessage(d.successfulRegistrationMessage);
      } */
    } catch (error) {
      /*
      if (typeof error === 'object' && error !== null) {
        setRegistrationErrors({
          ...registrationErrors,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          general: String(error.message),
        });
      } */
      console.log(error);
    }
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
              <Typography className="animate__animated animate__bounceIn" gutterBottom>
                {registrationErrors.general}
              </Typography>
            )}
            <form
              ref={formRef}
              encType="muplipart/form-data"
              method="POST"
              onSubmit={handleRegisterUser}
            >
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
                  className="animate__animated animate__bounceInLeft"
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
                  className="animate__animated animate__bounceInLeft"
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
                  className="animate__animated animate__bounceInLeft"
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
                Загрузить фото
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
                <Button color="primary" onClick={handleCloseDialog}>
                  Отмена
                </Button>
                <Button color="primary" type="submit" variant="outlined">
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
