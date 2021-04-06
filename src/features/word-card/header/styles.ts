import { red } from '@material-ui/core/colors';
import { createStyles, Theme } from '@material-ui/core/styles';

const gameCardStyles = (theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: red[theme.palette.type === 'light' ? 200 : 700],
    },
    playIcon: {
      height: theme.spacing(5),
      width: theme.spacing(5),
    },
    playButton: {
      padding: 0,
    },
    action: {
      margin: 0,
    },
  });

export default gameCardStyles;
