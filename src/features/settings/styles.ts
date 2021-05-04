import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    settings: {
      width: '300px',
      height: '140px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controls: {
      paddingLeft: '15px',
      '& span:first-child': {
        color: '#3f51b5',
      },
    },
    label: {
      paddingLeft: '10px',
    },
    button: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: theme.spacing(1.25),
      backgroundColor: '#5A38FD',
      [theme.breakpoints.down('sm')]: {
        minWidth: theme.spacing(4),
        width: theme.spacing(5),
      },
    },
  });

export default styles;
