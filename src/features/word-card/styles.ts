import { createStyles, Theme } from '@material-ui/core/styles';
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
      marginBottom: theme.spacing(1),
    },
  });

export default gameCardStyles;
