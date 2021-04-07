import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    miniGamesPage: {
      display: 'flex',
      flexDirection: 'column',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: theme.spacing(1.25),
      maxHeight: theme.spacing(43.75),
      maxWidth: theme.spacing(37.5),
      height: '100vh',
      padding: theme.spacing(1.25),
      width: '100%',
    },
    games: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    link: {
      textDecoration: 'none',
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: theme.spacing(2.5),
      margin: theme.spacing(2.25),
      '& a': {
        marginTop: theme.spacing(1),
        fontSize: theme.spacing(2.5),
        color: theme.palette.text.secondary,
      },
      '& div': {
        width: theme.spacing(12.5),
        height: theme.spacing(12.5),
      },
    },
  });

export default styles;
