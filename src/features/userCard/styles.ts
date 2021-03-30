import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(0, 1),
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      borderRadius: '10px',
    },
    userCard: {
      display: 'flex',
      flexDirection: 'column',
    },
    img: {
      display: 'block',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    userName: {
      margin: 0,
    },
  });

export default styles;
