import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    app: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& h3': {
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(3),
          fontWeight: 600,
        },
      },
      '& h5': {
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(2.5),
          fontWeight: 600,
        },
      },
      '& p': {
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(1),
        },
      },
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
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(4),
        },
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
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      '& img': {
        width: theme.spacing(75),
        height: theme.spacing(48),
        [theme.breakpoints.down('xs')]: {
          width: theme.spacing(45),
          height: theme.spacing(28),
        },
      },
    },
    video: {
      margin: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        width: '420px !important',
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
        width: theme.spacing(25),
        height: theme.spacing(15),
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
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      '& img': {
        width: theme.spacing(50),
        height: theme.spacing(30),
        [theme.breakpoints.down('sm')]: {
          width: theme.spacing(30),
          height: theme.spacing(20),
        },
      },
    },
    info: {
      width: theme.spacing(40),
      margin: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(50),
      },
    },
  });

export default styles;
