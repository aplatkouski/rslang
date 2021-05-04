import {
  IconButton,
  Link,
  Tooltip,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import Logo from 'logo.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const LogoButton = ({ classes }: Props): JSX.Element => (
  <Typography className={classes.title} variant="h6">
    <Tooltip title="На главную">
      <Link component={NavLink} to={ROUTES.main.url} underline="none">
        <IconButton>
          <img alt="RSLang" className={classes.logo} src={Logo} />
        </IconButton>
      </Link>
    </Tooltip>
  </Typography>
);

export default withStyles(styles, { withTheme: true })(LogoButton);
