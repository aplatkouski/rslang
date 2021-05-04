import { brown, green, pink, red } from '@material-ui/core/colors';
import { createStyles, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) => {
  const defaultColor = pink[theme.palette.type === 'light' ? 200 : 700];
  return createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    chip: {
      color: defaultColor,
      borderColor: defaultColor,
      padding: theme.spacing(1, 0),
      fontWeight: 700,
      fontSize: theme.spacing(2),
      margin: theme.spacing(2, 1),
    },
    avatar: {
      backgroundColor: brown[theme.palette.type === 'light' ? 200 : 700],
      color: defaultColor,
    },
    avatarColorPrimary: {
      backgroundColor: green[theme.palette.type === 'light' ? 200 : 700],
      color: defaultColor,
    },
    avatarColorSecondary: {
      backgroundColor: red[theme.palette.type === 'light' ? 200 : 700],
      color: defaultColor,
    },
  });
};

export default gameCardStyles;
