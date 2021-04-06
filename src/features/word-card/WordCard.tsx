import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  WithStyles,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import DeleteIcon from '@material-ui/icons/Delete';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import clsx from 'clsx';
import React, { memo } from 'react';
import { IWord } from 'types';
import { api } from '../../constants';
import Header from './header/Header';
import LearningProgress from './learning-progress/LearningProgress';
import styles from './styles';
import TransformText from './transform-text/TransformText';

interface Props extends WithStyles<typeof styles> {
  word: IWord;
}

const WordCard = ({ classes, word }: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [types, setTypes] = React.useState(() => ['bold', 'italic']);

  const handleSetType = (_: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setTypes(newFormats);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Header word={word} />
      <LearningProgress value={88} />
      <CardMedia
        className={classes.media}
        image={`${api}/${word.image}`}
        title={word.word}
      />
      <CardContent>
        <Typography paragraph>
          <TransformText text={word.textMeaning} />
        </Typography>
        <Typography>{word.textMeaningTranslate}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ToggleButtonGroup
          aria-label="set word type"
          onChange={handleSetType}
          value={types}
        >
          <ToggleButton aria-label="add word to training list" value="isStudied">
            <BookIcon />
          </ToggleButton>
          <ToggleButton aria-label="mark word as difficult" value="isDifficult">
            <PriorityHighIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <IconButton
          aria-label="mark word as deleted"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography color="textSecondary" component="p" paragraph variant="body2">
          <TransformText text={word.textExample} />
        </Typography>
        <Typography color="textSecondary" component="p" variant="body2">
          {word.textExampleTranslate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(memo(WordCard));
