import { createStyles, fade, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) => {
  const blurRadius = theme.spacing(4);
  const color = fade(theme.palette.secondary.light, 0.8);
  return createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2, 0),
      background: `linear-gradient(to top, ${fade(
        theme.palette.secondary.dark,
        0.6
      )}, ${fade(theme.palette.secondary.dark, 0.8)})`,
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

export default gameCardStyles;
