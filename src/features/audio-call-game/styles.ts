import { pink } from '@material-ui/core/colors';
import { createStyles, fade, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) => {
  const defaultColor = pink[theme.palette.type === 'light' ? 200 : 700];
  return createStyles({
    gameField: {
      position: 'relative',
      height: '100%',
    },
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
    button: {
      color: defaultColor,
      borderColor: defaultColor,
      padding: theme.spacing(1, 3),
      fontWeight: 700,
      borderRadius: theme.spacing(1.5),
      width: theme.spacing(20),
    },
  });
};

export default gameCardStyles;
