import { createStyles, Theme } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 1),
      background: theme.palette.background.default,
    },
    root__complex: {
      background: 'gray',
    },
    image: {
      width: theme.spacing(40),
      borderRadius: '2px',
      boxShadow: theme.shadows[1],
    },
    text: {
      userSelect: 'none',
    },
    button: {},
    audioButton: {
      padding: theme.spacing(0),
      border: '1px solid',
      borderColor: theme.palette.secondary.main,
    },
    audioIcon: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      color: theme.palette.secondary.main,
    },
  });

export default styles;
