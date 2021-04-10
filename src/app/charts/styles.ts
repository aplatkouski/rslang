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
  });

export default styles;
