import {
  IconButton,
  Tooltip,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import Logo from 'logo.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const LogoButton = ({ classes }: Props): JSX.Element => (
  <Typography className={classes.title} variant="h6">
    <Tooltip title="На главную">
      <NavLink to="/">
        <IconButton>
          <img alt="RSLang" className={classes.logo} src={Logo} />
        </IconButton>
      </NavLink>
    </Tooltip>
  </Typography>
);

export default withStyles(styles, { withTheme: true })(LogoButton);
