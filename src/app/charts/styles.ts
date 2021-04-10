import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    chart: {
      minWidth: theme.spacing(62.5),
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
  });

export default styles;
