import type { AppDispatch, RootState } from 'app/store';
import defaultLog from 'assets/img/default.svg';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { api } from '../constants';
import { IWord } from '../types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useShallowEqualSelector(
  selector: (state: RootState, ...rest: any) => any
) {
  return useAppSelector(selector, shallowEqual);
}

export const useImg = (gameImg?: string): string => {
  const [gameLogo, setGameLogo] = useState<string>(defaultLog);

  useEffect(() => {
    const loadLogo = async () => {
      const module = await import(`assets/img/${gameImg || 'default.svg'}`);
      return module.default;
    };
    loadLogo()
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((logo) => setGameLogo(logo))
      .catch(() => {});
  }, [gameImg]);

  return gameLogo;
};

export const useDate = (): string => {
  const date = useRef<string>(new Date().toISOString().substring(0, 10));
  if (new Date().toISOString().substring(0, 10).localeCompare(date.current)) {
    date.current = new Date().toISOString().substring(0, 10);
  }
  return date.current;
};

export const useHTMLElementWidth = <T extends HTMLElement>(elRef: RefObject<T>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (elRef.current) setWidth(elRef.current.offsetWidth);
    };

    if (elRef.current) {
      setWidth(elRef.current.offsetWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [elRef]);

  return width;
};

export const useCols = <T extends HTMLElement>(
  tileWidth = 320,
  maxCols = 4
): [RefObject<T>, number] => {
  const elRef = useRef<T>(null);
  const containerWidth = useHTMLElementWidth<T>(elRef);
  const [cols, setCols] = useState(1);

  useEffect(() => {
    if (containerWidth && tileWidth) {
      setCols(Math.min(Math.floor(containerWidth / tileWidth), maxCols || 1));
    } else {
      setCols(1);
    }
  }, [containerWidth, maxCols, tileWidth]);
  return [elRef, cols];
};

interface Audios {
  name: string;
  src: string;
}

type CurrentAudio = string | null;

interface AudioReturn {
  currentAudio: CurrentAudio;
  start: (index?: number, all?: boolean) => void;
  stop: () => void;
}

export const useAudio = (word: IWord): AudioReturn => {
  const audioElRef = useRef<HTMLAudioElement>(new Audio());
  const [audios, setAudios] = useState<Array<Audios>>([]);
  const [currentAudio, setCurrentAudio] = useState<CurrentAudio>(null);
  const indexAudio = useRef(0);

  useEffect(() => {
    setAudios(
      Object.entries(word).reduce((a, [field, value]) => {
        if (field.startsWith('audio')) {
          return [...a, { name: field, src: value }];
        }
        return a;
      }, [] as Array<Audios>)
    );
  }, [word]);

  const stopAudio = useCallback((): void => {
    indexAudio.current = 0;
    audioElRef.current.pause();
    setCurrentAudio(null);
  }, []);

  const startAudio = useCallback(
    (index = 0): void => {
      indexAudio.current = index;
      if (index < audios.length) {
        const { name, src } = audios[index];
        audioElRef.current.src = `${api}/${src}`;
        setCurrentAudio(name);
        audioElRef.current.play();
      } else {
        stopAudio();
      }
    },
    [audios, stopAudio]
  );

  useEffect(() => {
    const playNext = () => {
      startAudio(indexAudio.current + 1);
    };

    if (currentAudio) {
      audioElRef.current.addEventListener('ended', playNext);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => audioElRef.current.removeEventListener('ended', playNext);
    }
    return undefined;
  }, [indexAudio, audioElRef, currentAudio, startAudio]);

  return {
    currentAudio,
    start: startAudio,
    stop: stopAudio,
  };
};
