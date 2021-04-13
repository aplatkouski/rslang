import { pink } from '@material-ui/core/colors';
import { createStyles, fade, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) => {
  const defaultColor = pink[theme.palette.type === 'light' ? 200 : 700];
  const blurRadius = theme.spacing(4);
  const color = fade(defaultColor, 0.6);
  return createStyles({
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
      '& svg': {
        width: theme.spacing(9),
        height: theme.spacing(9),
      },
    },
    pink: {
      color: fade(theme.palette.secondary.dark, 0.2),
      backgroundColor: defaultColor,
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
