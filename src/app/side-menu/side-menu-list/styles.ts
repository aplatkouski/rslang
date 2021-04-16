import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    list: {
      overflowX: 'hidden',
      width: theme.spacing(30),
    },
    fullList: {
      width: 'auto',
    },
    drawer: {
      backgroundColor: theme.palette.primary.main,
    },
    menuTitle: {
      color: theme.palette.common.white,
    },
  });

export default styles;
