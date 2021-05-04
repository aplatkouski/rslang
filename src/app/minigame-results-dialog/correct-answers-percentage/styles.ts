import { createStyles, Theme } from '@material-ui/core/styles';

const correctAnswerPercentageStyles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingBottom: theme.spacing(4),
    },
    progressbar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  });

export default correctAnswerPercentageStyles;
