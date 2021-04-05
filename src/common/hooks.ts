import type { AppDispatch, RootState } from 'app/store';
import defaultLog from 'assets/img/default.svg';
import { useEffect, useRef, useState } from 'react';
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
