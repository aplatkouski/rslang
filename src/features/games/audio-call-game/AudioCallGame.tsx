import { Avatar, Box, Grid, WithStyles, withStyles } from '@material-ui/core';
import { VolumeUp as VolumeUpIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const AudioCallGame = ({ classes }: Props): JSX.Element => (
  <Grid
    alignItems="center"
    className={classes.root}
    container
    direction="column"
    justify="center"
  >
    <Grid item>
      <Box bgcolor="white" borderRadius="50%">
        <Avatar className={clsx(classes.large, classes.pink, classes.blinker)}>
          <VolumeUpIcon fontSize="large" />
        </Avatar>
      </Box>
    </Grid>
    <Grid item>word</Grid>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(AudioCallGame);
