import { Fab, useTheme, Zoom } from '@material-ui/core';
import { VolumeDown, VolumeOff } from '@material-ui/icons';
import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  sound: boolean;
  handleClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
  })
);

const SoundButton = ({ sound, handleClick }: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const fabs = [
    {
      color: 'secondary' as const,
      className: classes.fab,
      icon: <VolumeOff />,
      label: 'Звук выключен',
    },
    {
      color: 'primary' as const,
      className: classes.fab,
      icon: <VolumeDown />,
      label: 'Звук включен',
    },
  ];

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={+sound === index}
          style={{
            transitionDelay: `${+sound === index ? transitionDuration.exit : 0}ms`,
          }}
          timeout={transitionDuration}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={handleClick}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </>
  );
};

export default SoundButton;
