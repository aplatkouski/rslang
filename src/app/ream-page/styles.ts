import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(2.25),
      '& a': {
        marginTop: theme.spacing(1),
        'font-size': theme.spacing(2.5),
        color: theme.palette.text.secondary,
      },
      '& div': {
        width: '200px',
        height: '200px',
      },
    },
    avatar: {
      margin: theme.spacing(5),
    },
    divider: {
      height: '2px',
      margin: '35px 30px 0',
    },
    contribution: {
      height: '100%',
    },
  });

export default styles;
