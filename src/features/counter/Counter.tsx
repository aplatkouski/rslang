import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Counter.module.scss';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  selectCount,
} from './counterSlice';

export const Counter = (): JSX.Element => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className={styles.row}>
        <button
          aria-label="Increment value"
          className={styles.button}
          onClick={() => dispatch(increment())}
          type="button"
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          aria-label="Decrement value"
          className={styles.button}
          onClick={() => dispatch(decrement())}
          type="button"
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          aria-label="Set increment amount"
          className={styles.textbox}
          onChange={(e) => setIncrementAmount(e.target.value)}
          value={incrementAmount}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
          type="button"
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
          type="button"
        >
          Add Async
        </button>
      </div>
    </div>
  );
};
