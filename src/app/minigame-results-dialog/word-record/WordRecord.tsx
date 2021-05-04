import { Card, CardHeader, IconButton, WithStyles, withStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import clsx from 'clsx';
import { selectWordById } from 'features/words/wordsSlice';
import React from 'react';
import { useAppSelector } from '../../../common/hooks';
import { useSingleAudio } from '../hooks';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  id: string;
}

const WordRecord = ({ classes, id }: Props) => {
  const word = useAppSelector((state) => selectWordById(state, id));

  const { isAudioPlay, start: handlePlay, stop: handleStop } = useSingleAudio(
    word?.audio
  );

  const getActionIcon = () => {
    if (isAudioPlay) {
      return (
        <IconButton
          aria-label="play/pause"
          className={classes.actionButton}
          onClick={handleStop}
        >
          <StopIcon className={classes.actionIcon} />
        </IconButton>
      );
    }
    return (
      <IconButton
        aria-label="play/pause"
        className={classes.actionButton}
        onClick={handlePlay}
      >
        <PlayArrowIcon className={classes.actionIcon} />
      </IconButton>
    );
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={getActionIcon()}
        className={classes.header}
        classes={{
          action: classes.action,
          content: classes.content,
          title: clsx(classes.title, isAudioPlay && classes.blinker),
        }}
        subheader={word?.wordTranslate}
        title={<b>{word?.word}</b>}
      />
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(WordRecord);
