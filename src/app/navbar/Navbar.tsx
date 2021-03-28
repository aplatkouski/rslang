import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import SideMenu from 'app/sidemenu/SideMenu';
import LogInForm from 'features/logInForm/LogInForm';
import RegistrationForm from 'app/registrationForm/RegistrationForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrUser,
  delLogInErrMessage,
  logOut,
  getLoginStatus,
} from 'features/user/userSlice';
import UserCard from 'features/userCard/UserCard';

import Logo from 'assets/img/MainPageLogo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar(): JSX.Element {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);
  const [openLogInModal, setOpenLogInModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getCurrUser);
  const logInStatus = useSelector(getLoginStatus);

  const handleToggleSideMenu = () => {
    setDrawerState((state: boolean) => !state);
  };

  const handleOpenLogInModal = () => {
    setOpenLogInModal(true);
  };

  const handleCloseLogInModal = () => {
    if (!logInStatus) {
      setOpenLogInModal(false);
      dispatch(delLogInErrMessage());
    }
  };

  const handleRegister = () => {
    setOpenLogInModal(false);
    dispatch(delLogInErrMessage());
    setOpenRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  const handleExitUser = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (user && user.token && openLogInModal) {
      setOpenLogInModal(false);
      dispatch(delLogInErrMessage());
    }
  }, [dispatch, openLogInModal, user]);

  return (
    <div className={classes.root}>
      <SideMenu handleCloseSideMenu={() => handleToggleSideMenu()} open={drawerState} />
      <LogInForm
        isOpen={openLogInModal}
        onClose={handleCloseLogInModal}
        onRegister={handleRegister}
      />
      <RegistrationForm isOpen={openRegisterModal} onClose={handleCloseRegisterModal} />

      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="menu"
            className={classes.menuButton}
            color="inherit"
            edge="start"
            onClick={handleToggleSideMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            <Tooltip title="На главную">
              <NavLink to="/">
                <IconButton className={classes.menuButton} color="inherit">
                  <img
                    alt="RSLang"
                    src={Logo}
                    style={{ height: '50px', width: 'auto', borderRadius: '10px' }}
                  />
                </IconButton>
              </NavLink>
            </Tooltip>
          </Typography>
          {user && user.token ? (
            <>
              <UserCard />
              <Tooltip title="Выйти">
                <IconButton
                  aria-label="menu"
                  className={classes.menuButton}
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
                aria-label="menu"
                className={classes.menuButton}
                color="inherit"
                edge="start"
                onClick={handleOpenLogInModal}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
