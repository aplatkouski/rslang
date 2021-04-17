import { createStyles, fade, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => {
  const blurRadius = theme.spacing(2);
  const color = fade(theme.palette.primary.light, 0.5);
  return createStyles({
    root: {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      display: 'flex',
      direction: 'ltr',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginTop: theme.spacing(2),
    },
    success: {
      backgroundColor: fade(theme.palette.success.light, 0.5),
    },
    error: {
      backgroundColor: fade(theme.palette.error.light, 0.5),
    },
    word: {
      position: 'absolute',
      top: '15%',
      color: theme.palette.primary.light,
      fontSize: theme.spacing(6),
      fontWeight: theme.typography.fontWeightBold,
      padding: theme.spacing(0, 2),
      borderRadius: theme.spacing(2),
      pointerEvents: 'none',
      userSelect: 'none',
    },
    answers: {
      flexWrap: 'wrap',
      justifyContent: 'center',
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

export default styles;
