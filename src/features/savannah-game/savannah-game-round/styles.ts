import { createStyles, fade, Theme } from '@material-ui/core/styles';

const gameRoundStyles = (theme: Theme) => {
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
    button: {},
    success: {
      backgroundColor: fade(theme.palette.success.dark, 0.3),
    },
    error: {
      backgroundColor: fade(theme.palette.error.dark, 0.3),
    },
    word: {
      position: 'absolute',
      top: theme.spacing(2),
      pointerEvents: 'none',
    },
  });
};

export default gameRoundStyles;
