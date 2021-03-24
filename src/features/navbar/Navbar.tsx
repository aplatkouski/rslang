import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import SideMenu from 'features/sidemenu/SideMenu';

import MainLogo from 'assets/img/MainPageLogo.jpg';

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

  const handleToggleSideMenu = () => {
    setDrawerState(!drawerState);
  };

  return (
    <div className={classes.root}>
      <SideMenu handleCloseSideMenu={() => handleToggleSideMenu()} open={drawerState} />

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
                    src={MainLogo}
                    style={{ height: '50px', width: 'auto', borderRadius: '10px' }}
                  />
                </IconButton>
              </NavLink>
            </Tooltip>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
