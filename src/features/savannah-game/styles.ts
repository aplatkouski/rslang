import { createStyles, fade, Theme } from '@material-ui/core/styles';

const gameStyles = (theme: Theme) => {
  const blurRadius = theme.spacing(4);
  const color = fade(theme.palette.secondary.light, 0.8);
  return createStyles({
    root: {
      position: 'relative',
      height: '100%',
      minHeight: '70vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2, 0),
      background: `linear-gradient(to top, ${fade(
        theme.palette.secondary.dark,
        0.6
      )}, ${fade(theme.palette.secondary.dark, 0.8)})`,
    },
    progress: {
      position: 'absolute',
      top: '0',
      zIndex: 1,
      width: '100%',
      height: theme.spacing(0.5),
    },
    rating: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
      '& > svg': {
        width: theme.spacing(9),
        height: theme.spacing(9),
      },
    },
    pink: {
      color: fade(theme.palette.secondary.dark, 0.2),
      backgroundColor: fade(theme.palette.secondary.dark, 0.3),
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

export default gameStyles;
