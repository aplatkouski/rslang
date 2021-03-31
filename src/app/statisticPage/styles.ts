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
    card: {
      height: theme.spacing(28),
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'rgba(63, 81, 181, 0.2)',
      borderRadius: theme.spacing(1.5),
      '& img': {
        width: theme.spacing(25),
        height: theme.spacing(15),
        margin: theme.spacing(1),
      },
      [theme.breakpoints.down('md')]: {
        display: 'inline-block',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
    },
    description: {
      margin: theme.spacing(2),
    },
  });

export default styles;
