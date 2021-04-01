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
      margin: theme.spacing(1.25),
      backgroundColor: '#5A38FD',
    },
  });

export default styles;
