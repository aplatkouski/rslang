import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  WithStyles,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import StopIcon from '@material-ui/icons/Stop';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import clsx from 'clsx';
import React, { memo, useCallback } from 'react';
import { IWord } from 'types';
import { useAudio } from '../../common/hooks';
import { api } from '../../constants';
import LearningProgress from './learning-progress/LearningProgress';
import styles from './styles';
import TransformText from './transform-text/TransformText';

interface Props extends WithStyles<typeof styles> {
  word: IWord;
}

const WordCard = ({ classes, word }: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [types, setTypes] = React.useState(() => ['bold', 'italic']);
  const { currentAudio, start, stop } = useAudio(word);

  const handleSetType = (_: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setTypes(newFormats);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePlayAudio = useCallback(() => start(), [start]);

  const handleStopAudio = useCallback(() => stop(), [stop]);

  const blinkIfPlaying = (audio: string) =>
    currentAudio === audio ? classes.blinker : undefined;

  const getActionIcon = () => {
    if (currentAudio) {
      return (
        <IconButton
          aria-label="play/pause"
          className={classes.actionButton}
          onClick={handleStopAudio}
        >
          <StopIcon className={classes.actionIcon} />
        </IconButton>
      );
    }
    return (
      <IconButton
        aria-label="play/pause"
        className={classes.actionButton}
        onClick={handlePlayAudio}
      >
        <PlayArrowIcon className={classes.actionIcon} />
      </IconButton>
    );
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={getActionIcon()}
        avatar={
          <Avatar aria-label="priority" className={classes.avatar}>
            <PriorityHighIcon />
          </Avatar>
        }
        classes={{
          action: classes.action,
          title: blinkIfPlaying('audio'),
        }}
        subheader={word.wordTranslate}
        title={
          <>
            <b>{word.word}</b>
            {` ${word.transcription}`}
          </>
        }
      />
      <LearningProgress value={88} />
      <CardMedia
        className={classes.media}
        image={`${api}/${word.image}`}
        title={word.word}
      />
      <CardContent>
        <Typography className={blinkIfPlaying('audioMeaning')} paragraph>
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
        <Typography
          className={blinkIfPlaying('audioExample')}
          color="textSecondary"
          component="p"
          paragraph
          variant="body2"
        >
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
