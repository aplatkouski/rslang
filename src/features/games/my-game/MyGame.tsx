import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import loseGameSound from 'assets/sounds/lose.mp3';
import winGameSound from 'assets/sounds/win.mp3';
import { selectAllWords } from 'features/words/wordsSlice';
import { useAppSelector } from 'common/hooks';
import FullScreenButton from '../full-screen-button/FullScreenButton';
import SoundButton from '../sound-button/SoundButton';
import StartNewGameDlg from '../start-new-game-dlg/StartNewGameDlg';
import { shuffle } from './shuffleAlgorithm';
import {
  GAME_WORDS_NUMBER,
  GAME_ROUNDS,
  GAME_TITLE,
  GAME_RULES,
  GAME_BUTTONS,
  LOCALSTORAGE_KEY,
  MIN_GAME_WORDS_NUMBER,
} from './constants';
import * as t from '../../../types';
import * as gt from './types';

import './MyGame.scss';

export default function MyGame(): JSX.Element {
  const words = useAppSelector(selectAllWords);

  const [myGameStatus, setMyGameStatus] = useState<gt.IMyGameStatus>({
    // Слова, которые должны участвовать в играх
    words: words && words.length ? words : [],
    // true - слов в words достаточно для игры, false - не достаточно
    enoughWords: words && words.length >= MIN_GAME_WORDS_NUMBER,
    // true - начата новая игра, false - игра не начата
    newGame: false,
    // номер текущего раунда в рамках текущей игры
    round: 0,
    // слова, участвующие в текущем раунде
    gameWords: [],
    // слово, которое необходимо угадать
    guessWord: null,
    // английское слово (из guessWord), в котором "спрятана" одна буква
    hiddenWord: null,
    // "спрятанная" буква
    hiddenLetter: null,
    // показать "спрятанную" букву
    showHiddenLetter: false,
    // true - открыто модальное окно запуска игры, false - данное окно закрыто
    openStartGameModal: true,
    // результаты игры (объект с полями [слово]: числовой результат узнавания его в игре)
    gameResults: [],
    // id правильного слова-ответа раунда и id неправильного, если user ответил неправильно
    rightWordId: null,
    wrongWordId: null,
    // true - необходимо продолжить игру (устанавливается в true после того как пользователь даст ответ)
    continue: false,
    // true - звук включен, false - выключен
    sound: true,
  });

  // Звуки победы и поражения
  const [playWinGameSound] = useSound(winGameSound);
  const [playLoseGameSound] = useSound(loseGameSound);

  // ???
  const history = useHistory();

  // Хук для определения факта первого рендера
  const useFirstRender = () => {
    const firstRender = useRef(true);

    useEffect(() => {
      firstRender.current = false;
    }, []);

    return firstRender.current;
  };

  // true - первый рендер, false - повторный
  const firstRender = useFirstRender();

  /**
   * Позволяет получить состояние игры из localstorage
   */
  const getGameStatusFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{}');
  };

  /**
   * Позволяет сохранить текущее состояние игры в localstorage
   */
  const saveCurrGameStatusInLocalStorage = () => {
    const savedUserData = getGameStatusFromLocalStorage();
    localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({
        ...savedUserData,
        ...myGameStatus,
      })
    );
  };

  /**
   * Подгружаем состояние игры из localstorage при первом рендере (если оно там есть),
   * при повторных рендерах сохраняю текущее состояние.
   */
  useEffect(() => {
    let saveCurrentStatus = false;

    if (firstRender) {
      // При первом рендере проверяю, предоставлены ли слова для игры.
      // Если да - то ничего далее не делаю, даже если их недостаточно.
      // Если нет - то пытаюсь найти последнюю игру в localstorage.
      if (!myGameStatus.words || !myGameStatus.words.length) {
        // Смотрим, что есть в localstorage
        const savedUserData = getGameStatusFromLocalStorage();
        // Ранее сохраненные данные игры есть в localstorage => обновляю ими состояние игры
        if (savedUserData && Object.keys(savedUserData).length) {
          setMyGameStatus({ ...savedUserData });
          // Может оказаться так, что пользователь перезагрузил игру в момент, когда он дал ответ,
          // но еще не был установлен флаг продолжения игры. В этом случае его необходимо установить,
          // чтобы игру можно было продолжить
          if (savedUserData.rightWordId && !savedUserData.continue) {
            setMyGameStatus((status) => {
              return {
                ...status,
                continue: true,
              };
            });
          }
        } else {
          // В localstorage нет ранее сохраненных данных игры => сохраняю туда текущее состояние
          saveCurrentStatus = true;
        }
      }
    } else {
      // При повторных рендерах просто сохраняю текущее измененное состояние
      saveCurrentStatus = true;
    }

    if (saveCurrentStatus) {
      saveCurrGameStatusInLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstRender, myGameStatus]);

  /**
   * Для данного слова (wordId) обновляет результат его изучения
   * (+1 - если угадано, -1 - в противном случае)
   */
  const updateGameResults = (wordId: string, isGuessed: boolean) => {
    const wordResIndex = myGameStatus.gameResults.findIndex(
      (word) => word.wordId === wordId
    );

    // Слово еще не угадывалось в текущей игре
    if (wordResIndex === -1) {
      setMyGameStatus((status) => {
        return {
          ...status,
          gameResults: [
            ...status.gameResults,
            {
              wordId,
              guessed: isGuessed ? 1 : 0,
              notGuessed: isGuessed ? 0 : 1,
            },
          ],
        };
      });
    } else {
      // Это уже не первая попытка угадать слово в рамках одной игры
      const guessed: number = isGuessed
        ? myGameStatus.gameResults[wordResIndex].guessed + 1
        : myGameStatus.gameResults[wordResIndex].guessed;
      const notGuessed: number = !isGuessed
        ? myGameStatus.gameResults[wordResIndex].notGuessed + 1
        : myGameStatus.gameResults[wordResIndex].notGuessed;
      setMyGameStatus((status) => {
        return {
          ...status,
          gameResults: [
            ...status.gameResults.slice(0, wordResIndex),
            { wordId, guessed, notGuessed },
            ...status.gameResults.slice(wordResIndex + 1),
          ],
        };
      });
    }
  };

  /**
   * Для данного слова заменяет произвольную его букву на "..."
   */
  const hideLetter = (word: string) => {
    // рандомно выбираю номер буквы в слове для замены
    const letterNumber = Math.floor(Math.random() * word.length);
    // "спрятанная" буква
    const hiddenLetter = word[letterNumber];
    // replace заменяет только первое вхождение подстроки в строку
    const wordWithHiddenLetter = word.replace(word[letterNumber], '...');

    return { hiddenLetter, wordWithHiddenLetter };
  };

  /**
   * Возвращает массив из GAME_WORDS_NUMBER целых неповторяющихся чисел, выбранных
   * рандомно из чисел от 1 до words.length (границы не включены)
   */
  const numberGenerator = () => {
    const numbersArr = myGameStatus.words.map((_el, index) => index);
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
    // Генерируем случайные числа от 0 до words.length - 1
    const arrayOfUniqueNumbers = numberGenerator();

    // Используя сгенерированные числа, определяем случайную перестановку слов, участвующих в игре
    const generatedWords = arrayOfUniqueNumbers.map(
      (number) => myGameStatus.words[number]
    );

    // Определяем слово, которое предстоит угадать
    const wordToGuess = generatedWords[0];
    // "Прячем" в этом слове букву
    const { hiddenLetter, wordWithHiddenLetter } = hideLetter(generatedWords[0].word);

    // Первые GAME_WORDS_NUMBER слов из generatedWords перетасовываем и пускаем в игру
    const shuffledWords = getShuffledGameWords(generatedWords);

    // Меняем статус игры
    setMyGameStatus((status) => {
      return {
        ...status,
        round: status.round + 1, // Следующий "раунд"
        guessWord: wordToGuess,
        hiddenWord: wordWithHiddenLetter,
        hiddenLetter,
        showHiddenLetter: false,
        gameWords: shuffledWords,
        rightWordId: null,
        wrongWordId: null,
        continue: false,
      };
    });
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
    if (!myGameStatus.enoughWords) {
      return;
    }

    // Меняем статус игры
    setMyGameStatus((status) => {
      return {
        ...status,
        openStartGameModal: false, // Если открыто модальное окно запуска мини-игры, то его необходимо закрыть
        newGame: true,
        round: 0,
        gameResults: [],
      };
    });

    // Начинаем первый раунд
    nextRound();
  };

  /**
   * Завершает игру
   */
  const finishGame = () => {
    setMyGameStatus((status) => {
      return {
        ...status,
        newGame: false,
        continue: false,
      };
    });

    // ... Сохранение результатов игры
  };

  /**
   * Пользователь может нажимать на кнопку ответа / давать ответ лишь
   * если определено угадываемое слово и на него еще не дан ответ.
   */
  const userCanGiveAnswer = useCallback(() => {
    return myGameStatus.guessWord && !myGameStatus.rightWordId;
  }, [myGameStatus.guessWord, myGameStatus.rightWordId]);

  /**
   * Завершение раунда / игры
   */
  const goToNextRoundOrGame = () => {
    setTimeout(() => {
      if (myGameStatus.round === GAME_ROUNDS) {
        finishGame();
      } else {
        nextRound();
      }
    }, 2000);
  };

  /**
   * Реакция на установку флага продолжения игры
   */
  useEffect(() => {
    if (myGameStatus.continue) {
      goToNextRoundOrGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myGameStatus.continue]);

  /**
   * Обработка ответа пользователя
   */
  const handleUserAnswer = (answerWordId: string) => {
    if (!userCanGiveAnswer()) {
      return;
    }
    if (!myGameStatus.guessWord) {
      return;
    }

    updateGameResults(
      myGameStatus.guessWord.id,
      myGameStatus.guessWord.id === answerWordId
    );

    setMyGameStatus((status) => {
      return {
        ...status,
        rightWordId: status.guessWord ? status.guessWord.id : null,
        showHiddenLetter: true,
      };
    });

    if (myGameStatus.guessWord.id !== answerWordId) {
      if (myGameStatus.sound) {
        playLoseGameSound();
      }
      setMyGameStatus((status) => {
        return {
          ...status,
          wrongWordId: answerWordId,
        };
      });
    } else if (myGameStatus.sound) {
      playWinGameSound();
    }

    setMyGameStatus((status) => {
      return {
        ...status,
        continue: true,
      };
    });
  };

  /**
   * Настраиваем игру на работу с помощью клавиатуры
   */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): any => {
      if (!userCanGiveAnswer()) {
        return;
      }
      if (['1', '2', '3'].includes(event.key)) {
        handleUserAnswer(myGameStatus.gameWords[Number(event.key) - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myGameStatus.gameWords, myGameStatus.guessWord, userCanGiveAnswer]);

  /**
   * Включение / выключение звука в игре
   */
  const toggleSound = () => {
    setMyGameStatus((status) => {
      return {
        ...status,
        sound: !status.sound,
      };
    });
  };

  return (
    <div className="game-field">
      <FullScreenButton />
      <SoundButton handleClick={toggleSound} sound={myGameStatus.sound} />
      <StartNewGameDlg
        gameBtns={GAME_BUTTONS}
        gameHeader={GAME_TITLE}
        gameRules={GAME_RULES}
        isOpen={myGameStatus.openStartGameModal}
        onGoBack={handleGoBack}
        onStartGame={handleStartGame}
      />
      {myGameStatus.newGame &&
        myGameStatus.guessWord &&
        myGameStatus.hiddenWord &&
        myGameStatus.gameWords &&
        myGameStatus.gameWords.length && (
          <Grid container spacing={4} style={{ width: '100%', margin: 0 }}>
            <Grid item xs={12}>
              <p className="game-title">{GAME_TITLE}</p>
            </Grid>
            <Grid item xs={12}>
              <p className="game-round">{`Раунд ${myGameStatus.round} из ${GAME_ROUNDS}`}</p>
            </Grid>
            <Grid item xs={12}>
              <div className="centered-content-block">
                <div className="guess-word">
                  {!myGameStatus.showHiddenLetter
                    ? myGameStatus.hiddenWord
                    : myGameStatus.hiddenWord.replace(
                        '...',
                        String(myGameStatus.hiddenLetter)
                      )}
                </div>
              </div>
            </Grid>
            {myGameStatus.gameWords.map((word, index) => (
              <Grid key={word.id} item sm={4} xs={6}>
                <div className="centered-content-block">
                  <button
                    className={`answer-btn
                    ${
                      word.id !== myGameStatus.rightWordId &&
                      word.id !== myGameStatus.wrongWordId
                        ? 'no-answer'
                        : ''
                    }
                    ${myGameStatus.rightWordId === word.id ? 'right-answer' : ''}
                    ${myGameStatus.wrongWordId === word.id ? 'wrong-answer' : ''}`}
                    onClick={() => handleUserAnswer(word.id)}
                    type="button"
                  >
                    {`${index + 1}: ${word.wordTranslate}`}
                  </button>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      {!myGameStatus.openStartGameModal && !myGameStatus.newGame && (
        <div>
          {JSON.stringify(myGameStatus.gameResults)}
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
