import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
    progress: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  });

export default styles;
