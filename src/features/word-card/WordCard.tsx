import {
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
import {
  Book as BookIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
  PriorityHigh as PriorityHighIcon,
  RestoreFromTrash as RestoreFromTrashIcon,
  Stop as StopIcon,
} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector, useAudio } from 'common/hooks';
import { selectSettings } from 'features/settings/settingsSlice';
import {
  removeUserWord,
  selectUserWordByWordId,
  upsertUserWord,
} from 'features/user-words/userWordsSlice';
import { selectCorrectVsWrongByWordId } from 'features/word-statistics/wordStatisticsSlice';
import React, { memo, useCallback } from 'react';
import { IWord } from 'types';
import { api } from '../../constants';
import LearningProgress from './learning-progress/LearningProgress';
import styles from './styles';
import TransformText from './transform-text/TransformText';
import extractUserWord from './utils/extract-user-word';
import isAllRequiredFieldEmpty from './utils/is-all-required-field-empty';

interface Props extends WithStyles<typeof styles> {
  word: IWord;
}

const WordCard = ({ classes, word }: Props) => {
  const [types, setTypes] = React.useState(() => ['bold', 'italic']);
  const { currentAudio, start, stop } = useAudio(word);
  const { isShowTranslations, isShowButtons } = useAppSelector(selectSettings);
  const userWord = useAppSelector((state) =>
    selectUserWordByWordId(state, { wordId: word.id })
  );
  const answerTotal = useAppSelector((state) =>
    selectCorrectVsWrongByWordId(state, { wordId: word.id })
  );

  const dispatch = useAppDispatch();

  const { isDeleted, isDifficult, isStudied } = userWord || {};

  const handleSetType = (_: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setTypes(newFormats);
  };

  const handleToggleDelete = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (userWord && isAllRequiredFieldEmpty('isDeleted', userWord)) {
        dispatch(removeUserWord(userWord.id));
      } else {
        dispatch(
          upsertUserWord({ ...extractUserWord(word, userWord), isDeleted: !isDeleted })
        );
      }
    },
    [dispatch, isDeleted, userWord, word]
  );

  const handleToggleDifficult = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (userWord && isAllRequiredFieldEmpty('isDifficult', userWord)) {
        dispatch(removeUserWord(userWord.id));
      } else {
        const studied =
          !isDifficult && !isStudied
            ? {
                addedAt: new Date().toISOString().substring(0, 10),
                isStudied: true,
              }
            : {};
        dispatch(
          upsertUserWord({
            ...extractUserWord(word, userWord),
            isDifficult: !isDifficult,
            ...studied,
          })
        );
      }
    },
    [dispatch, isDifficult, isStudied, userWord, word]
  );

  const handleToggleStudied = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (userWord && isAllRequiredFieldEmpty('isStudied', userWord)) {
        dispatch(removeUserWord(userWord.id));
      } else {
        dispatch(
          upsertUserWord({
            ...extractUserWord(word, userWord),
            addedAt: !isStudied ? new Date().toISOString().substring(0, 10) : undefined,
            isStudied: !isStudied,
          })
        );
      }
    },
    [dispatch, isStudied, userWord, word]
  );

  const handlePlayAudio = useCallback(() => start(), [start]);

  const handleStopAudio = useCallback(() => stop(), [stop]);

  const getActionIcon = () => {
    if (currentAudio) {
      return (
        <IconButton
          aria-label="pause"
          className={classes.actionButton}
          onClick={handleStopAudio}
        >
          <StopIcon className={classes.actionIcon} />
        </IconButton>
      );
    }
    return (
      <IconButton
        aria-label="play"
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
        avatar={isDifficult && <PriorityHighIcon />}
        classes={{
          action: classes.action,
          avatar: classes.avatar,
        }}
        disableTypography
        subheader={
          <Typography
            align="center"
            className={clsx(isDifficult && classes.important)}
            variant="body1"
          >
            {isShowTranslations && word.wordTranslate}
          </Typography>
        }
        title={
          <Typography
            align="center"
            className={clsx(
              currentAudio === 'audio' && classes.blinker,
              isDifficult && classes.important
            )}
            component="h4"
            variant="h6"
          >
            <b>{word.word}</b>
            {` ${word.transcription}`}
          </Typography>
        }
      />
      <LearningProgress answerTotal={answerTotal} />
      <CardMedia
        className={classes.media}
        image={`${api}/${word.image}`}
        title={word.word}
      />
      <CardContent>
        <Typography
          className={clsx(
            currentAudio === 'audioMeaning' && classes.blinker,
            classes.paragraph
          )}
          paragraph
        >
          <TransformText text={word.textMeaning} />
        </Typography>
        {isShowTranslations && <Typography>{word.textMeaningTranslate}</Typography>}
      </CardContent>
      {isShowButtons && (
        <CardActions disableSpacing>
          {!isDeleted && (
            <ToggleButtonGroup
              aria-label="set word type"
              onChange={handleSetType}
              value={types}
            >
              <ToggleButton
                aria-label="toggle word as learning"
                onClick={handleToggleStudied}
                selected={isStudied}
                value="isStudied"
              >
                <BookIcon />
              </ToggleButton>

              <ToggleButton
                aria-label="toggle word as difficult"
                onClick={handleToggleDifficult}
                selected={isDifficult}
                value="isDifficult"
              >
                <PriorityHighIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          <IconButton
            aria-label="toggle word as deleted"
            className={classes.expand}
            onClick={handleToggleDelete}
          >
            {isDeleted ? <RestoreFromTrashIcon /> : <DeleteIcon />}
          </IconButton>
        </CardActions>
      )}
      <CardContent>
        <Typography
          className={clsx(
            currentAudio === 'audioExample' && classes.blinker,
            classes.paragraph
          )}
          color="textSecondary"
          component="p"
          paragraph
          variant="body2"
        >
          <TransformText text={word.textExample} />
        </Typography>
        {isShowTranslations && (
          <Typography color="textSecondary" component="p" variant="body2">
            {word.textExampleTranslate}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(memo(WordCard));
