import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(0),
      marginBottom: theme.spacing(0.5),
    },
    gridList: {
      backgroundColor: theme.palette.background.paper,
    },
    tile: {
      padding: theme.spacing(0, 1),
    },
  });

export default styles;
