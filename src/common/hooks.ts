import type { AppDispatch, RootState } from 'app/store';
import defaultLog from 'assets/img/default.svg';
import { RefObject, useEffect, useRef, useState } from 'react';
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

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
  tileWidth = 320
): [RefObject<T>, number] => {
  const elRef = useRef<T>(null);
  const containerWidth = useHTMLElementWidth<T>(elRef);
  const [cols, setCols] = useState(1);

  useEffect(() => {
    if (containerWidth && tileWidth) {
      setCols(Math.floor(containerWidth / tileWidth));
    } else {
      setCols(1);
    }
  }, [containerWidth, tileWidth]);
  return [elRef, cols];
};
