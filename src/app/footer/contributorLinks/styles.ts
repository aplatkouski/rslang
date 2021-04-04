import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    item: {
      color: theme.palette.primary.main,
      margin: theme.spacing(1, 0),
      minWidth: theme.spacing(20),
      textAlign: 'center',
    },
    link: {
      color: 'white',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      '&:hover': {
        color: theme.palette.text.secondary,
      },
      '& > *': {
        marginLeft: theme.spacing(1),
        transition: 'all 1s ease',
      },
    },
  });

export default styles;
