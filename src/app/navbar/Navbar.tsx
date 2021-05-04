import { AppBar, Container, IconButton, Toolbar } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import LogoButton from './logo-button/LogoButton';
import styles from './styles';
import UserButton from './user-button/UserButton';

interface Props extends WithStyles<typeof styles> {
  onOpenLogInModal: () => void;
  onToggleSideMenu: () => void;
}

const Navbar = (props: Props): JSX.Element => {
  const {
    classes,
    onOpenLogInModal: handleOpenLogInModal,
    onToggleSideMenu: handleToggleSideMenu,
  } = props;

  return (
    <AppBar className={classes.root} position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton aria-label="menu" color="inherit" onClick={handleToggleSideMenu}>
            <MenuIcon />
          </IconButton>
          <LogoButton />
          <UserButton onOpenLogInModal={handleOpenLogInModal} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Navbar);
