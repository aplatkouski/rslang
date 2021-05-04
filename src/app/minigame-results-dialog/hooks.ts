import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../constants';

interface AudioReturn {
  isAudioPlay: boolean;
  start: () => void;
  stop: () => void;
}

export const useSingleAudio = (src: string | undefined): AudioReturn => {
  const audioElRef = useRef<HTMLAudioElement>(new Audio());
  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);

  const audio = audioElRef.current;

  useEffect(() => {
    if (src) {
      audio.src = `${api}/${src}`;
    }
  }, [audio, src]);

  const stopAudio = useCallback((): void => {
    audio.pause();
    audio.currentTime = 0;
    setIsAudioPlay(false);
  }, [audio]);

  const startAudio = useCallback((): void => {
    if (src) {
      audio.play();
      setIsAudioPlay(true);
    }
  }, [audio, src]);

  useEffect(() => {
    audio.addEventListener('ended', stopAudio);
    return () => audio.removeEventListener('ended', stopAudio);
  }, [audio, stopAudio]);

  return {
    isAudioPlay,
    start: startAudio,
    stop: stopAudio,
  };
};
