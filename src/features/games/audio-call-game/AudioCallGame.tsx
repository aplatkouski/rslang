import { Avatar, Box, Grid, WithStyles, withStyles } from '@material-ui/core';
import { VolumeUp as VolumeUpIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { useAppSelector } from 'common/hooks';
import React from 'react';
import { selectCurrentWord } from '../gamesSlice';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const AudioCallGame = ({ classes }: Props): JSX.Element => {
  const word = useAppSelector(selectCurrentWord);
  return (
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
      {word && <Grid item>{word.id}</Grid>}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(AudioCallGame);
