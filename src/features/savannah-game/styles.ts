import { createStyles, Theme } from '@material-ui/core/styles';

const gameStyles = (theme: Theme) => {
  return createStyles({
    root: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2, 0),
    },
    rating: {
      position: 'absolute',
      top: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > * + *': {
        marginTop: theme.spacing(1.5),
      },
    },
  });
};

export default gameStyles;
