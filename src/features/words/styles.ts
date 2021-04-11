import { grey } from '@material-ui/core/colors';
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
    },
    gridList: {
      backgroundColor: theme.palette.background.paper,
    },
    textbookPanel: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'sticky',
      zIndex: 10,
      top: 0,
      backgroundColor: grey[theme.palette.type === 'light' ? 200 : 700],
    },
    tile: {
      padding: theme.spacing(0, 1),
    },
  });

export default styles;
