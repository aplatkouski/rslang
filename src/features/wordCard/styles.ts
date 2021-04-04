import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    outerBox: {
      margin: theme.spacing(1),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: theme.spacing(40),
      margin: theme.spacing(1),
      background: theme.palette.background.default,
    },
    root__complex: {
      background: theme.palette.warning.light,
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
    buttonsGroup: {
      marginTop: 'auto',
    },
    audioButton: {
      padding: theme.spacing(0),
      marginRight: theme.spacing(1),
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
