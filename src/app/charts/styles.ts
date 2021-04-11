import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    chart: {
      minWidth: theme.spacing(62.5),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      margin: theme.spacing(3),
    },
    chartTitle: {
      margin: theme.spacing(2),
    },
  });

export default styles;
