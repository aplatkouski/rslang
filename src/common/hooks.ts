import type { AppDispatch, RootState } from 'app/store';
import defaultLog from 'assets/img/default.svg';
import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGameLogo = (gameImg?: string): string => {
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
