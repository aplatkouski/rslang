import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(6),
    },
    table: {
      minWidth: 500,
      '& tr:last-child': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  });

export default styles;
