import { createStyles, fade, Theme } from '@material-ui/core/styles';

const timerStyles = (theme: Theme) => {
  const blurRadius = theme.spacing(4);
  const color = fade(theme.palette.primary.light, 0.8);
  return createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
    avatar: {
      width: theme.spacing(14),
      height: theme.spacing(14),
      borderRadius: '50%',
      color: theme.palette.primary.dark,
    },
    '@keyframes opacityBlinker': {
      '0%': {
        opacity: '0.1',
      },
      '50%': {
        opacity: '1',
      },
      '100%': {
        opacity: '0.1',
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
