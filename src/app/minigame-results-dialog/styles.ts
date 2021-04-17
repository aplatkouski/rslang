import { green, red, yellow } from '@material-ui/core/colors';
import { createStyles, Theme } from '@material-ui/core/styles';

const miniGameResultDialogStyles = (theme: Theme) =>
  createStyles({
    root: {},
    content: {
      marginBottom: theme.spacing(1),
      '&::-webkit-scrollbar': {
        width: theme.spacing(1),
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[400],
        borderRadius: theme.spacing(0.5),
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        borderRadius: theme.spacing(0.5),
      },
    },
    paper: {
      width: '100%',
    },
    title: {
      fontSize: theme.spacing(2),
      fontWeight: theme.typography.fontWeightBold,
      padding: theme.spacing(0.5, 0.5),
      borderRadius: theme.spacing(0.2),
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    list: {
      marginBottom: theme.spacing(3),
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
    mistake: {
      backgroundColor: yellow[theme.palette.type === 'light' ? 200 : 700],
    },
    buttonsGroup: {
      justifyContent: 'center',
    },
    radioGroup: {
      textAlign: 'center',
    },
  });

export default miniGameResultDialogStyles;
