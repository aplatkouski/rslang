import { IconButton, Tooltip } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon, Person as PersonIcon } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import UserCard from 'features/user/UserCard';
import { getCurrUser, logOut } from 'features/user/userSlice';
import React, { useCallback } from 'react';

interface Props {
  onOpenLogInModal: () => void;
}

const UserButton = ({ onOpenLogInModal: handleOpenLogInModal }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(getCurrUser);

  const handleExitUser = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return user && user.token ? (
    <>
      <UserCard />
      <Tooltip title="Выйти">
        <IconButton
          aria-label="log out"
          color="inherit"
          edge="start"
          onClick={handleExitUser}
        >
          <ExitToAppIcon />
        </IconButton>
      </Tooltip>
    </>
  ) : (
    <Tooltip title="Войти / Зарегистрироваться">
      <IconButton
        aria-label="log in / sign up"
        color="inherit"
        edge="start"
        onClick={handleOpenLogInModal}
      >
        <PersonIcon />
      </IconButton>
    </Tooltip>
  );
};

export default UserButton;
