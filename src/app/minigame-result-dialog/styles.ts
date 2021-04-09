import { red, green } from '@material-ui/core/colors';
import { createStyles, Theme } from '@material-ui/core/styles';

const miniGameResultDialog = (theme: Theme) =>
  createStyles({
    root: {},
    content: {
      marginBottom: theme.spacing(1),
    },
    paper: {
      width: '100%',
    },
    title: {
      fontSize: theme.spacing(2.5),
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    listItem: {
      padding: theme.spacing(0.5, 0),
    },
    answer: {
      padding: theme.spacing(0, 1),
      borderRadius: theme.spacing(0.25),
    },
    correct: {
      backgroundColor: green[theme.palette.type === 'light' ? 200 : 700],
    },
    error: {
      backgroundColor: red[theme.palette.type === 'light' ? 200 : 700],
    },
    buttonsGroup: {
      justifyContent: 'center',
    },
  });

export default miniGameResultDialog;
