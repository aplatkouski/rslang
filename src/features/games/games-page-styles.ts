import { createStyles, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2, 0),
    },
  });

export default gameCardStyles;
