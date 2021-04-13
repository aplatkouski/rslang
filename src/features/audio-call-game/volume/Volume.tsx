import { Fab, withStyles, WithStyles } from '@material-ui/core';
import { VolumeUp as VolumeUpIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { useAppSelector } from 'common/hooks';
import { selectCurrentWord } from 'features/games/gamesSlice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../../constants';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const Volume = ({ classes }: Props): JSX.Element => {
  const word = useAppSelector(selectCurrentWord);
  const audioElRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (word) {
      audioElRef.current.src = `${api}/${word.audio}`;
      audioElRef.current.play();
      setIsPlaying(true);
    }
  }, [word]);

  const handleClick = useCallback(() => {
    if (isPlaying) {
      audioElRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioElRef.current.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    const setIsPlayingToFalse = () => {
      setIsPlaying(false);
    };

    if (isPlaying) {
      audioElRef.current.addEventListener('ended', setIsPlayingToFalse);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => audioElRef.current.removeEventListener('ended', setIsPlayingToFalse);
    }
    return undefined;
  }, [audioElRef, isPlaying]);

  return (
    <Fab
      className={clsx(classes.large, classes.pink, isPlaying && classes.blinker)}
      onClick={handleClick}
    >
      <VolumeUpIcon />
    </Fab>
  );
};

export default withStyles(styles, { withTheme: true })(Volume);
