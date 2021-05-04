import { createStyles, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) =>
  createStyles({
    determinate: {
      height: theme.spacing(1),
      width: '100%',
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      backgroundColor: theme.palette.success.main,
    },
  });

export default gameCardStyles;
