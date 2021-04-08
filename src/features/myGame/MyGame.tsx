import React, { useState, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { getWords } from 'features/words/wordsSlice';
import { useSelector } from 'react-redux';
import StartNewGameDlg from 'app/startNewGameDlg/StartNewGameDlg';
import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import loseGameSound from 'assets/sounds/lose.mp3';
import winGameSound from 'assets/sounds/win.mp3';
import { shuffle } from './shuffleAlgorithm';
import {
  GAME_WORDS_NUMBER,
  GAME_ROUNDS,
  GAME_TITLE,
  GAME_RULES,
  GAME_BUTTONS,
} from './constants';
import * as t from '../../types';
import * as gt from './types';

import './MyGame.scss';

export default function MyGame(): JSX.Element {
  // слова, участвующие в игре
  const words = useSelector(getWords);

  // true - начата новая игра, false - игра не начата
  const [newGame, setNewGame] = useState(false);
  // номер текущего раунда в рамках текущей игры
  const [round, setRound] = useState(0);
  // слова, участвующие в текущем раунде
  const [gameWords, setGameWords] = useState<t.WordsList>([]);
  // слово, которое необходимо угадать
  const [guessWord, setGuessWord] = useState<t.IWord | null>(null);
  // английское слово (из guessWord), в котором "спрятана" одна буква
  const [hiddenWord, setHiddenWord] = useState<string | null>(null);
  // массив целых чисел от нуля до значения "количество слов words - 1"
  const numbersArr = useMemo(() => words.map((_el, index) => index), [words]);
  // true - открыто модальное окно запуска игры, false - данное окно закрыто
  const [openStartGameModal, setOpenStartGameModal] = useState(true);
  // результаты игры (объект с полями [слово]: числовой результат узнавания его в игре)
  const [gameResults, setGameResults] = useState<gt.WordsRes>([]);
  //
  const [rightWordId, setRightWordId] = useState<string | null>(null);
  const [wrongWordId, setWrongWordId] = useState<string | null>(null);

  const [playWinGameSound] = useSound(winGameSound);
  const [playLoseGameSound] = useSound(loseGameSound);

  const history = useHistory();

  /**
   * Для данного слова (wordId) обновляет результат его изучения
   * (+1 - если угадано, -1 - в противном случае)
   */
  const updateGameResults = (wordId: string, isGuessed: boolean) => {
    setGameResults((value) => {
      const wordResIndex = value.findIndex((word) => word.wordId === wordId);
      if (wordResIndex === -1) {
        return [
          ...value,
          {
            wordId,
            guessed: isGuessed ? 1 : 0,
            notGuessed: isGuessed ? 0 : 1,
          },
        ];
      }
      const guessed: number = isGuessed
        ? value[wordResIndex].guessed + 1
        : value[wordResIndex].guessed;
      const notGuessed: number = !isGuessed
        ? value[wordResIndex].notGuessed + 1
        : value[wordResIndex].notGuessed;
      return [
        ...value.slice(0, wordResIndex),
        { wordId, guessed, notGuessed },
        ...value.slice(wordResIndex + 1),
      ];
    });
  };

  /**
   * Для данного слова заменяет произвольную его букву на "..."
   */
  const hideLetter = (word: string) => {
    const letterNumber = Math.floor(Math.random() * word.length);
    return word.replace(word[letterNumber], '...');
  };

  /**
   * Возвращает массив из GAME_WORDS_NUMBER целых неповторяющихся чисел, выбранных
   * рандомно из чисел от 1 до words.length (границы не включены)
   */
  const numberGenerator = () => {
    const randomNums = shuffle(numbersArr);
    return randomNums.slice(0, GAME_WORDS_NUMBER);
  };

  /**
   * Возвращает произвольным образом выбранные GAME_WORDS_NUMBER слов для игры
   */
  const getShuffledGameWords = (wordsArr: t.WordsList): t.WordsList => {
    const numArr = [];
    for (let i = 0; i < GAME_WORDS_NUMBER; i += 1) {
      numArr.push(i);
    }
    const randomNums = shuffle(numArr);
    return randomNums.map((number) => wordsArr[number]);
  };

  /**
   * Начинает очередной раунд игры
   */
  const nextRound = () => {
    // Следующий "раунд"
    setRound((value) => value + 1);

    // Генерируем случайные числа от 0 до words.length - 1
    const arrayOfUniqueNumbers = numberGenerator();

    // Используя сгенерированные числа, определяем случайную перестановку слов, участвующих в игре
    const generatedWords = arrayOfUniqueNumbers.map((number) => words[number]);

    // Определяем слово, которое предстоит угадать
    setGuessWord(generatedWords[0]);

    // "Прячем" в этом слове букву
    setHiddenWord(hideLetter(generatedWords[0].word));

    // Первые GAME_WORDS_NUMBER слов из generatedWords перетасовываем и пускаем в игру
    setGameWords(getShuffledGameWords(generatedWords));

    setRightWordId(null);
    setWrongWordId(null);
  };

  /**
   * Возвращаемся на предыдущую страницу
   */
  const handleGoBack = () => {
    if (history.length > 1) {
      history.goBack();
    }
  };

  /**
   * Начинает игру
   */
  const handleStartGame = () => {
    // Если открыто модальное окно запуска мини-игры, то его необходимо закрыть
    if (openStartGameModal) {
      setOpenStartGameModal(false);
    }
    // Сбрасываем все параметры игры
    setNewGame(true);
    setRound(0);
    setGameResults([]);
    // Начинаем первый раунд
    nextRound();
  };

  /**
   * Завершает игру
   */
  const finishGame = () => {
    setNewGame(false);

    // ... Сохранение результатов игры
  };

  /**
   * Обработка ответа пользователя
   */
  const handleUserAnswer = (answerWordId: string) => {
    if (!guessWord || rightWordId) {
      return;
    }

    updateGameResults(guessWord.id, guessWord.id === answerWordId);

    setRightWordId(guessWord.id);
    if (guessWord.id !== answerWordId) {
      playLoseGameSound();
      setWrongWordId(answerWordId);
    } else {
      playWinGameSound();
    }

    setTimeout(() => {
      if (round === GAME_ROUNDS) {
        finishGame();
      } else {
        nextRound();
      }
    }, 2000);
  };

  return (
    <div className="game-field">
      <StartNewGameDlg
        gameBtns={GAME_BUTTONS}
        gameHeader={GAME_TITLE}
        gameRules={GAME_RULES}
        isOpen={openStartGameModal}
        onGoBack={handleGoBack}
        onStartGame={handleStartGame}
      />
      {newGame && guessWord && hiddenWord && gameWords && gameWords.length && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <p className="game-title">{GAME_TITLE}</p>
          </Grid>
          <Grid item xs={12}>
            <p className="game-round">{`Раунд ${round} из ${GAME_ROUNDS}`}</p>
          </Grid>
          <Grid item xs={12}>
            <div className="word-block guess-word">{hiddenWord}</div>
          </Grid>
          {gameWords.map((word, index) => (
            <Grid key={word.id} item sm={4} xs={6}>
              <div className="word-block">
                <button
                  className={`answer-btn ${
                    rightWordId && rightWordId === word.id ? 'right-answer' : ''
                  }${wrongWordId && wrongWordId === word.id ? 'wrong-answer' : ''}`}
                  onClick={() => handleUserAnswer(word.id)}
                  type="button"
                >
                  {`${index + 1}: ${word.wordTranslate}`}
                </button>
              </div>
            </Grid>
          ))}
          <button onClick={handleGoBack} type="button">
            Вернуться к учебнику
          </button>
        </Grid>
      )}
      {!openStartGameModal && !newGame && (
        <div>
          {JSON.stringify(gameResults)}
          <button onClick={handleStartGame} type="button">
            Играть еще
          </button>
          <button onClick={handleGoBack} type="button">
            Вернуться к учебнику
          </button>
        </div>
      )}
    </div>
  );
}
