import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    app: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(6),
      '& h1': {
        fontSize: theme.spacing(7),
        marginTop: theme.spacing(2),
      },
    },
    background: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'rgba(63, 81, 181, 0.1)',
    },
    ellips: {
      position: 'absolute',
      zIndex: -1,
      margin: '5px',
    },
    title: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(10),
      '& img': {
        width: theme.spacing(75),
        height: theme.spacing(48),
      },
    },
    video: {
      margin: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        width: '310px !important',
      },
    },
    card: {
      height: theme.spacing(28),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(63, 81, 181, 0.2)',
      borderRadius: theme.spacing(1.5),
      '& img': {
        width: theme.spacing(27),
        height: theme.spacing(17),
        margin: theme.spacing(2),
      },
    },
    description: {
      margin: theme.spacing(4),
    },
    team: {
      width: '100%',
      display: 'flex',
      height: theme.spacing(40),
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'rgba(63, 81, 181, 0.2)',
      borderRadius: theme.spacing(2),
      '& img': {
        width: theme.spacing(50),
        height: theme.spacing(30),
      },
    },
    info: {
      width: theme.spacing(40),
      margin: theme.spacing(4),
    },
  });

export default styles;
