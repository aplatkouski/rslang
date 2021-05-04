import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const CircularIndeterminate = ({ classes }: Props): JSX.Element => (
  <Backdrop className={classes.root} open>
    <CircularProgress className={classes.progress} color="secondary" />
  </Backdrop>
);

export default withStyles(styles, { withTheme: true })(CircularIndeterminate);
