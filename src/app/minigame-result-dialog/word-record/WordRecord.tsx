import { Card, CardHeader, IconButton, WithStyles, withStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import clsx from 'clsx';
import React from 'react';
// import { selectWordsById } from 'features/words/wordsAPSlice';
import { IWord } from 'types';
// import { useAppSelector } from '../../../common/hooks';
import { useSingleAudio } from '../hooks';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  // id: string;
}

const WORD: IWord = {
  audio: 'files/03_0046.mp3',
  audioExample: 'files/03_0046_example.mp3',
  audioMeaning: 'files/03_0046_meaning.mp3',
  group: 0,
  id: '5e9f5ee35eb9e72bc21af4cd',
  image: 'files/03_0046.jpg',
  page: 2,
  textExample: 'Going skiing last winter was the most fun I’ve <b>ever</b> had.',
  textExampleTranslate:
    'Кататься на лыжах прошлой зимой было самым веселым из всего, что я когда-либо ел',
  textMeaning: '<i>Ever</i> means at any time.',
  textMeaningTranslate: 'Всегда означает в любое время',
  transcription: '[évər]',
  word: 'ever',
  wordTranslate: 'когда-либо',
};

const WordRecord = ({ classes }: Props) => {
  const { audio, word, wordTranslate } = WORD;
  // const { audio, word, wordTranslate }: IWord = useAppSelector(selectWordsById(id));
  const { isAudioPlay, start: handlePlay, stop: handleStop } = useSingleAudio(audio);

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
        subheader={wordTranslate}
        title={<b>{word}</b>}
      />
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(WordRecord);
