import { createStyles, Theme } from '@material-ui/core/styles';

const gamePointsStyles = (theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: theme.spacing(4),
    },
    result: {
      fontWeight: theme.typography.fontWeightBold,
    },
  });

export default gamePointsStyles;
