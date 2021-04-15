import { createStyles, fade, Theme } from '@material-ui/core/styles';

const timerStyles = (theme: Theme) => {
  const blurRadius = theme.spacing(4);
  const color = fade(theme.palette.secondary.light, 0.8);
  return createStyles({
    root: {
      borderRadius: '50%',
      backgroundColor: 'white',
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
    pink: {
      color: fade(theme.palette.secondary.dark, 0.2),
      backgroundColor: fade(theme.palette.secondary.dark, 0.3),
    },
    '@keyframes opacityBlinker': {
      '0%': {
        opacity: '0.2',
      },
      '50%': {
        opacity: '1',
      },
      '100%': {
        opacity: '0.2',
      },
    },
    timer: {
      fontSize: theme.spacing(8),
      animation: '$opacityBlinker 1s infinite linear',
    },
    '@keyframes blinker': {
      '0%': {
        boxShadow: `0 0 ${blurRadius}px ${blurRadius}px ${color}`,
      },
      '50%': {
        boxShadow: `0 0 ${blurRadius * 3}px ${color}`,
      },
      '100%': {
        boxShadow: `0 0 ${blurRadius}px ${blurRadius}px ${color}`,
      },
    },
    blinker: {
      animation: '$blinker 1s infinite linear',
    },
  });
};

export default timerStyles;
