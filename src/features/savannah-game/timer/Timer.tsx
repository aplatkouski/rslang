import { Avatar, Box, Typography, WithStyles, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useTimer } from './useTimer';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  timer: number;
  onEnd: () => void;
}

const Timer: React.FC<Props> = ({ classes, timer, onEnd }) => {
  const { tick } = useTimer(timer);

  useEffect(() => {
    if (tick === 0) {
      onEnd();
    }
  }, [tick, onEnd]);

  return (
    <Box className={classes.root}>
      <Avatar className={clsx(classes.large, classes.pink, tick && classes.blinker)}>
        <Typography className={classes.timer}>{tick}</Typography>
      </Avatar>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(Timer);
