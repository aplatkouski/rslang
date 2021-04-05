import { createStyles, fade, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(25),
      margin: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: fade(theme.palette.primary.main, 0.2),
      borderRadius: theme.spacing(1.5),
    },
    reverse: {
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row-reverse',
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
    cover: {
      margin: theme.spacing(2),
      height: theme.spacing(10),
      width: '100%',
      maxWidth: theme.spacing(18),
    },
  });

export default gameCardStyles;
