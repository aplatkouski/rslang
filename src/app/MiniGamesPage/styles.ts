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
      margin: 10,
      maxHeight: 350,
      maxWidth: 300,
      height: '100vh',
      padding: 10,
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
        width: '100px',
        height: '100px',
      },
    },
  });

export default styles;
