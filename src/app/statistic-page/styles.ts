import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    table: {
      maxWidth: theme.spacing(100),
      minWidth: theme.spacing(58),
      '& tr:last-child': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    header: {
      marginTop: theme.spacing(3),
    },
    tablecontainer: {
      margin: theme.spacing(4, 'auto'),
      width: '100%',
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chartsBlock: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

export default styles;
