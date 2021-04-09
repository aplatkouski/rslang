import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../constants';

interface AudioReturn {
  isAudioPlay: boolean;
  start: () => void;
  stop: () => void;
}

export const useSingleAudio = (src: string): AudioReturn => {
  const audioElRef = useRef<HTMLAudioElement>(new Audio());
  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);

  const audio = audioElRef.current;

  useEffect(() => {
    audio.src = `${api}/${src}`;
  }, [audio, src]);

  const stopAudio = useCallback((): void => {
    audio.pause();
    setIsAudioPlay(false);
  }, [audio]);

  const startAudio = useCallback((): void => {
    audio.play();
    setIsAudioPlay(true);
  }, [audio]);

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
