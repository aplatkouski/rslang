import { createStyles, fade, Theme } from '@material-ui/core/styles';
import { WORD_CARD_MARGIN, WORD_CARD_WIDTH } from '../../constants';

// "margin: -4px" in GridList component
const cardWidth = (WORD_CARD_WIDTH - WORD_CARD_MARGIN - 4) / 8;
const cardMargin = WORD_CARD_MARGIN / 8;

const gameCardStyles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(cardWidth),
      borderRadius: theme.spacing(2),
      margin: theme.spacing(cardMargin, 0),
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    paragraph: {
      '&:last-child': {
        marginBottom: theme.spacing(0),
      },
    },
    actionIcon: {
      height: theme.spacing(5),
      width: theme.spacing(5),
    },
    actionButton: {
      padding: 0,
    },
    action: {
      margin: 0,
    },
    '@keyframes blinker': {
      '0%': { backgroundColor: 'none' },
      '50%': { backgroundColor: theme.palette.grey[200] },
      '100%': { backgroundColor: 'none' },
    },
    blinker: {
      borderRadius: theme.spacing(0.5),
      animationName: '$blinker',
      animationDuration: '1500ms',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    },
    important: {
      color: fade(theme.palette.secondary.dark, 0.54),
      marginLeft: theme.spacing(-5),
    },
    avatar: {
      position: 'relative',
      left: theme.spacing(-1.5),
      top: theme.spacing(-3.5),
      borderRadius: '50%',
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor: fade(theme.palette.secondary.light, 0.15),
      color: fade(theme.palette.secondary.dark, 0.54),
    },
  });

export default gameCardStyles;
