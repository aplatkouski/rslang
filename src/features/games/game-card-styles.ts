import { createStyles, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: theme.spacing(58),
      margin: theme.spacing(2),
      borderRadius: theme.spacing(1.5),
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
    cover: {
      margin: theme.spacing(1, 'auto'),
      height: theme.spacing(25),
      width: theme.spacing(25),
    },
  });

export default gameCardStyles;
