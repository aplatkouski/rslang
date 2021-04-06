import { Avatar, CardHeader, IconButton, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import React from 'react';
import { IWord } from '../../../types';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
  word: IWord;
}

const TransformText = ({ classes, word }: IProps) => (
  <CardHeader
    action={
      <IconButton aria-label="play/pause" className={classes.playButton}>
        <PlayArrowIcon className={classes.playIcon} />
      </IconButton>
    }
    avatar={
      <Avatar aria-label="priority" className={classes.avatar}>
        <PriorityHighIcon />
      </Avatar>
    }
    classes={{ action: classes.action }}
    subheader={word.wordTranslate}
    title={
      <>
        <b>{word.word}</b>
        {` ${word.transcription}`}
      </>
    }
  />
);

export default withStyles(styles, { withTheme: true })(TransformText);
