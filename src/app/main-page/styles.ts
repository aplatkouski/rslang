import { createStyles, fade, Theme } from '@material-ui/core/styles';

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
      maxWidth: theme.spacing(154),
      margin: theme.spacing(3, 'auto'),
      '& h1': {
        fontSize: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(4),
        },
      },
    },
    background: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: fade(theme.palette.primary.main, 0.1),
    },
    ellipse: {
      position: 'absolute',
      zIndex: -1,
      paddingLeft: theme.spacing(12),
      '& img': {
        marginTop: theme.spacing(8),
      },
    },
    title: {
      display: 'flex',
      justifyContent: 'space-around',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      '& img': {
        width: theme.spacing(70),
        [theme.breakpoints.down('sm')]: {
          maxWidth: theme.spacing(100),
          width: '100%',
        },
      },
    },
    video: {
      margin: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(52.5),
      },
    },
    team: {
      width: '100%',
      display: 'flex',
      height: theme.spacing(40),
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: fade(theme.palette.primary.main, 0.2),
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
