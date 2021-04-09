import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const LinearIndeterminate = ({ classes }: Props): JSX.Element => (
  <div className={classes.root}>
    <LinearProgress color="secondary" />
  </div>
);

export default withStyles(styles, { withTheme: true })(LinearIndeterminate);
