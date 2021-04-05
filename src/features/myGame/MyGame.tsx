import React, { useEffect, useState, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { getWords } from 'features/words/wordsSlice';
import { useSelector } from 'react-redux';
import * as t from '../../types';

import './MyGame.scss';

// const MIN_GAME_WORDS_NUMBER = 6;
const GAME_WORDS_NUMBER = 3;

interface AnswerProps {
  title: string;
}

function GameAnswerBlock({ title }: AnswerProps): JSX.Element {
  return <div className="answer">{title}</div>;
}

export default function MyGame(): JSX.Element {
  const [newGame, setNewGame] = useState(false);
  const [guessWord, setGuessWord] = useState<t.IWord | null>(null);
  const [hiddenWord, setHiddenWord] = useState<string | null>(null);
  const [gameWords, setGameWords] = useState<t.WordsList>([]);
  const words = useSelector(getWords);
  const numbersArr = useMemo(() => words.map((_el, index) => index), [words]);

  /**
   * Случайная перестановка заданных чисел
   */
  function shuffle(array: Array<number>) {
    let i = array.length;
    let j = 0;
    let temp;

    // eslint-disable-next-line no-plusplus
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));

      // swap randomly chosen element with current element
      temp = array[i];
      // eslint-disable-next-line no-param-reassign
      array[i] = array[j];
      // eslint-disable-next-line no-param-reassign
      array[j] = temp;
    }

    return array;
  }

  /**
   * Возвращает массив из GAME_WORDS_NUMBER целых неповторяющихся чисел, выбранных
   * рандомно из чисел от 1 до words.length (границы не включены)
   */
  const numberGenerator = () => {
    const randomNums = shuffle(numbersArr);
    return randomNums.slice(0, GAME_WORDS_NUMBER);
  };

  /**
   *
   */
  const hideLetter = (word: string) => {
    const letterNumber = Math.floor(Math.random() * word.length);
    return word.replace(word[letterNumber], '...');
  };

  /**
   *
   */
  const getShuffledGameWords = (wordsArr: t.WordsList): t.WordsList => {
    const numArr = [];
    for (let i = 0; i < GAME_WORDS_NUMBER; i += 1) {
      numArr.push(i);
    }
    const randomNums = shuffle(numArr);
    return randomNums.map((number) => wordsArr[number]);
  };

  const restartGame = () => {
    // Генерируем случайные числа от 0 до words.length - 1
    const arrayOfUniqueNumbers = numberGenerator();
    const generatedWords = arrayOfUniqueNumbers.map((number) => words[number]);

    //
    setGuessWord(generatedWords[0]);
    setHiddenWord(hideLetter(generatedWords[0].word));

    //
    setGameWords(getShuffledGameWords(generatedWords));
  };

  useEffect(() => {
    setNewGame(true);
  }, []);

  useEffect(() => {
    restartGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newGame]);

  return (
    <div>
      {guessWord && hiddenWord && gameWords && gameWords.length && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="word">{hiddenWord}</div>
          </Grid>
          {gameWords.map((word, index) => (
            <Grid item xs={4}>
              <GameAnswerBlock title={`${index + 1}: ${word.wordTranslate}`} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
