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
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import StopIcon from '@material-ui/icons/Stop';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { memo, useCallback } from 'react';
import { IUserWord, IWord } from 'types';
import { useAppDispatch, useAppSelector, useAudio } from '../../common/hooks';
import { api } from '../../constants';
import { removeUserWord, upsertUserWord } from '../user-words/userWordsSlice';
import { selectCredentials } from '../user/userSlice';
import LearningProgress from './learning-progress/LearningProgress';
import styles from './styles';
import TransformText from './transform-text/TransformText';
import extractUserWord from './utils/extract-user-word';
import isAllRequiredFieldEmpty from './utils/is-all-required-field-empty';

interface Props extends WithStyles<typeof styles> {
  word: IWord;
  userWord?: IUserWord;
}

const WordCard = ({ classes, word, userWord }: Props) => {
  const [types, setTypes] = React.useState(() => ['bold', 'italic']);
  const { currentAudio, start, stop } = useAudio(word);
  const credentials = useAppSelector(selectCredentials);
  const dispatch = useAppDispatch();

  const { isDeleted, isDifficult, isStudied } = userWord || {};

  const handleSetType = (_: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setTypes(newFormats);
  };

  const handleToggleDelete = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (userWord && isAllRequiredFieldEmpty('isDeleted', userWord)) {
        dispatch(
          removeUserWord({
            id: userWord.id,
            ...credentials,
          })
        );
      } else {
        dispatch(
          upsertUserWord({
            obj: { ...extractUserWord(word, userWord), isDeleted: !isDeleted },
            ...credentials,
          })
        );
      }
    },
    [credentials, dispatch, isDeleted, userWord, word]
  );

  const handleToggleDifficult = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (userWord && isAllRequiredFieldEmpty('isDifficult', userWord)) {
        dispatch(
          removeUserWord({
            id: userWord.id,
            ...credentials,
          })
        );
      } else {
        dispatch(
          upsertUserWord({
            obj: { ...extractUserWord(word, userWord), isDifficult: !isDifficult },
            ...credentials,
          })
        );
      }
    },
    [credentials, dispatch, isDifficult, userWord, word]
  );

  const handleToggleStudied = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (userWord && isAllRequiredFieldEmpty('isStudied', userWord)) {
        dispatch(
          removeUserWord({
            id: userWord.id,
            ...credentials,
          })
        );
      } else {
        dispatch(
          upsertUserWord({
            obj: {
              ...extractUserWord(word, userWord),
              addedAt: !isStudied ? new Date().toISOString().substring(0, 10) : undefined,
              isStudied: !isStudied,
            },
            ...credentials,
          })
        );
      }
    },
    [credentials, dispatch, isStudied, userWord, word]
  );

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
          <ToggleButton
            aria-label="add word to training list"
            onClick={handleToggleStudied}
            selected={isStudied}
            value="isStudied"
          >
            <BookIcon />
          </ToggleButton>
          <ToggleButton
            aria-label="mark word as difficult"
            onClick={handleToggleDifficult}
            selected={isDifficult}
            value="isDifficult"
          >
            <PriorityHighIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <IconButton
          aria-label="mark word as deleted"
          className={classes.expand}
          onClick={handleToggleDelete}
        >
          {isDeleted ? <RestoreFromTrashIcon /> : <DeleteIcon />}
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
