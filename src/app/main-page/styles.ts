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
      height: 'auto',
      margin: theme.spacing(3, 0),
      '& h1': {
        fontSize: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(4),
        },
      },
    },
    background: {
      width: '100%',
      height: 'auto',
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
    playerWrapper: {
      position: 'relative',
      paddingTop: '56.25%',
      width: '80%',
      height: 'auto',
    },
    video: {
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      position: 'absolute',
    },
    team: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      width: '100%',
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
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    infoText: {
      padding: theme.spacing(0, 4),
    },
  });

export default styles;
