import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    chart: {
      minWidth: theme.spacing(63),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      margin: theme.spacing(3),
    },
    chartTitle: {
      margin: theme.spacing(2),
    },
    chartSubtitle: {
      margin: theme.spacing(1),
    },
  });

export default styles;
