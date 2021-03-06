import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      margin: 'auto',
      maxWidth: theme.spacing(128),
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      color: 'white',
      marginTop: 'auto',
      backgroundColor: theme.palette.primary.main,
      flexShrink: 0,
      padding: theme.spacing(0, 2),
      boxShadow: `0 -2px 2px -2px ${theme.palette.text.secondary}`,
    },
    item: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
      '& a:hover': {
        color: theme.palette.text.secondary,
      },
      '& a img': {
        width: theme.spacing(6.25),
        height: 'initial',
        transition: 'all .5s ease',
      },
    },
    rsLang: {
      '& p': {
        fontWeight: 500,
      },
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
      '& a:hover': {
        color: theme.palette.text.secondary,
      },
    },
  });

export default styles;
