import { createStyles, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    logo: { height: theme.spacing(5), width: 'auto' },
  });

export default gameCardStyles;
