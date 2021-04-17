import { Avatar, Backdrop, Typography, WithStyles, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import styles from './styles';
import { useTimer } from './useTimer';

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
    <Backdrop className={classes.root} open>
      <Avatar className={clsx(classes.avatar, tick && classes.blinker)}>
        <Typography className={classes.timer}>{tick}</Typography>
      </Avatar>
    </Backdrop>
  );
};

export default withStyles(styles, { withTheme: true })(Timer);
