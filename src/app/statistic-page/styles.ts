import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    table: {
      maxWidth: theme.spacing(80),
      minWidth: theme.spacing(60),
      '& tr:last-child': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    header: {
      marginTop: theme.spacing(3),
    },
    tablecontainer: {
      margin: theme.spacing(4, 'auto'),
      width: 'auto',
    },
  });

export default styles;
