import { Fab, useTheme, Zoom } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const FullScreenButton = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [fullscreen, setFullscreen] = React.useState(document.fullscreenElement ? 1 : 0);

  document.documentElement.addEventListener('fullscreenchange', () => {
    setFullscreen(document.fullscreenElement ? 1 : 0);
  });

  const handleChangeFullscreen = () => {
    if (document.fullscreenEnabled) {
      if (fullscreen) {
        document
          .exitFullscreen()
          .then(() => setFullscreen(0))
          .catch(() => {});
      } else {
        document.documentElement
          .requestFullscreen()
          .then(() => setFullscreen(1))
          .catch(() => {});
      }
    } else {
      console.log('Your browser cannot use fullscreen right now');
    }
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary' as const,
      className: classes.fab,
      icon: <Fullscreen />,
      label: 'Fullscreen',
    },
    {
      color: 'secondary' as const,
      className: classes.fab,
      icon: <FullscreenExit />,
      label: 'Fullscreen Exit',
    },
  ];

  return (
    <>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={fullscreen === index}
          style={{
            transitionDelay: `${fullscreen === index ? transitionDuration.exit : 0}ms`,
          }}
          timeout={transitionDuration}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={handleChangeFullscreen}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </>
  );
};

export default FullScreenButton;
