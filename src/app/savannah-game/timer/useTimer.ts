import { useEffect, useState } from 'react';

interface TimerReturn {
  tick: number;
}

export const useTimer = (timer: number): TimerReturn => {
  const [tick, setTick] = useState<number>(timer);

  useEffect(() => {
    if (tick === 0) {
      return undefined;
    }

    const timerId: number = window.setTimeout(() => {
      setTick((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [tick]);

  return {
    tick,
  };
};
