import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    chartBlock: {
      flexGrow: 1,
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      margin: theme.spacing(3),
      overflow: 'auto',
    },
    chartTitle: {
      margin: theme.spacing(2),
    },
  });

export default styles;
