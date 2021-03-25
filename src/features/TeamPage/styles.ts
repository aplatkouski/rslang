import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    item: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'justify',
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(2.25),
      '& a': {
        marginTop: theme.spacing(1.25),
        'font-size': theme.spacing(2.5),
        color: theme.palette.text.secondary,
      },
      '& div': {
        width: '100px',
        height: '100px',
      },
    },
    avatar: {
      color: theme.palette.text.secondary,
      margin: theme.spacing(5),
    },
    divider: {
      height: '2px',
      margin: '35px 30px 0',
    },
  });

export default styles;
