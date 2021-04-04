import { createStyles, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: theme.spacing(58),
      margin: theme.spacing(2, 2),
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      margin: theme.spacing(1, 'auto'),
      height: theme.spacing(25),
      width: theme.spacing(25),
    },
  });

export default gameCardStyles;
