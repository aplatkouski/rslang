import { createStyles, Theme } from '@material-ui/core/styles';

const wordRecordStyles = (theme: Theme) =>
  createStyles({
    root: {
      boxShadow: 'none',
    },
    header: {
      padding: theme.spacing(0.5),
    },
    title: {
      fontSize: theme.spacing(2),
    },
    actionIcon: {
      height: theme.spacing(4),
      width: theme.spacing(4),
    },
    actionButton: {
      padding: 0,
    },
    action: {
      margin: theme.spacing(0, 2, 0, 0),
      order: 1,
      borderRadius: '50%',
      boxShadow: theme.shadows[1],
    },
    content: {
      order: 2,
    },
    '@keyframes blinker': {
      '0%': { backgroundColor: 'none' },
      '50%': { backgroundColor: theme.palette.grey[200] },
      '100%': { backgroundColor: 'none' },
    },
    blinker: {
      borderRadius: theme.spacing(0.5),
      animationName: '$blinker',
      animationDuration: '1000ms',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    },
  });

export default wordRecordStyles;
