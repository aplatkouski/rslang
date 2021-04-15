import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import useSound from 'use-sound';
import loseGameSound from 'assets/sounds/lose.mp3';
import winGameSound from 'assets/sounds/win.mp3';
import FullScreenButton from 'app/full-screen-button/FullScreenButton';
import SoundButton from 'app/sound-button/SoundButton';
import StartNewGameDlg from 'app/start-new-game-dlg/StartNewGameDlg';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { selectWrongTranslations } from 'features/words/wordsSlice';
import {
  GAME_WORDS_NUMBER,
  GAME_ROUNDS,
  GAME_TITLE,
  GAME_RULES,
  GAME_BUTTONS,
} from './constants';
import * as t from '../../types';
import * as gt from './types';
import { response } from '../games/gamesSlice';

import './MyGame.scss';

interface Props {
  word: t.IWord;
}

export default function MyGame({ word }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  // слова, участвующие в текущем раунде в качестве неверных ответов
  const wrongTranslations = useAppSelector((state) =>
    selectWrongTranslations(state, { wordId: word.id, count: GAME_WORDS_NUMBER - 1 })
  );

  const [myGameStatus, setMyGameStatus] = useState<gt.IMyGameStatus>({
    // все слова раунда (то, которое необходимо угадать, и неправильные ответы)
    gameWords: null,
    // слово, которое необходимо угадать
    currWord: null,
    // true - слов в words достаточно для игры, false - не достаточно
    enoughWords: false,
    // true - начата новая игра, false - игра не начата
    newGame: false,
    // номер текущего раунда в рамках текущей игры
    round: 0,
    // это необходимо для первого слова в игре, чтобы оно не повторялось во втором раунде
    waitingForNextRound: false,
    // английское слово (из guessWord), в котором "спрятана" одна буква
    hiddenWord: null,
    // "спрятанная" буква
    hiddenLetter: null,
    // показать "спрятанную" букву
    showHiddenLetter: false,
    // true - открыто модальное окно запуска игры, false - данное окно закрыто
    openStartGameModal: true,
    // слово-ответ пользователя в раунде
    userAnswer: null,
    // true - необходимо продолжить игру (устанавливается в true после того как пользователь даст ответ)
    continue: false,
    // true - звук включен, false - выключен
    sound: true,
  });

  // Звуки победы и поражения
  const [playWinGameSound] = useSound(winGameSound);
  const [playLoseGameSound] = useSound(loseGameSound);

  /**
   * Для текущего слова, которое необходимо угадать пользователю,
   * заменяет произвольную его букву на "..."
   */
  const hideLetter = () => {
    if (!word) {
      return { hiddenLetter: null, wordWithHiddenLetter: null };
    }
    // рандомно выбираю номер буквы в слове для замены
    const letterNumber = Math.floor(Math.random() * word.word.length);
    // "спрятанная" буква
    const hiddenLetter = word.word[letterNumber];
    // replace заменяет только первое вхождение подстроки в строку
    const wordWithHiddenLetter = word.word.replace(word.word[letterNumber], '...');
    return { hiddenLetter, wordWithHiddenLetter };
  };

  useEffect(() => {
    continueRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  const continueRound = () => {
    // "Прячем" в текущем слове букву
    const { hiddenLetter, wordWithHiddenLetter } = hideLetter();

    // Определяем позицию, на которую поместить в массив слов правильное слово
    const rightWordPos = Math.floor(Math.random() * (wrongTranslations.length + 1));

    setMyGameStatus((status) => {
      return {
        ...status,
        gameWords: [
          ...wrongTranslations.slice(0, rightWordPos),
          word,
          ...wrongTranslations.slice(rightWordPos),
        ],
        currWord: word,
        round: status.round + 1, // Следующий "раунд"
        hiddenWord: wordWithHiddenLetter,
        hiddenLetter,
        showHiddenLetter: false,
        userAnswer: null,
        continue: false,
        waitingForNextRound: false,
      };
    });
  };

  /**
   * Начинает очередной раунд игры
   * (слово, которое предстоит угадать, определяется автоматически)
   */
  const nextRound = () => {
    // В самом начале игры есть проблема: первое слово без этого кода повторяется во втором раунде
    if (myGameStatus.currWord && myGameStatus.currWord.id === word.id) {
      setMyGameStatus((status) => {
        return {
          ...status,
          waitingForNextRound: true,
        };
      });
    } else {
      continueRound();
    }
  };

  /**
   * Начинает игру
   */
  const handleStartGame = () => {
    // Смотрим, достаточно ли слов для игры
    if (
      !word ||
      !wrongTranslations ||
      wrongTranslations.length !== GAME_WORDS_NUMBER - 1
    ) {
      setMyGameStatus((status) => {
        return {
          ...status,
          enoughWords: false,
        };
      });
      return;
    }

    // Если слов для игры достаточно, продолжаем
    setMyGameStatus((status) => {
      return {
        ...status,
        enoughWords: true,
        openStartGameModal: false, // Если открыто модальное окно запуска мини-игры, то его необходимо закрыть
        newGame: true,
        round: 0,
      };
    });

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

    // Сохранение результатов игры происходит автоматически
  };

  /**
   * Пользователь может нажимать на кнопку ответа / давать ответ лишь
   * если определено угадываемое слово и на него еще не дан ответ
   */
  const userCanGiveAnswer = useCallback(() => {
    return myGameStatus.currWord && !myGameStatus.userAnswer;
  }, [myGameStatus.currWord, myGameStatus.userAnswer]);

  /**
   * Завершение раунда / игры
   */
  const goToNextRoundOrGame = () => {
    setTimeout(() => {
      if (myGameStatus.userAnswer && myGameStatus.currWord) {
        // Устанавливаем результат угадывания текущего слова
        dispatch(
          response({
            correctAnswerTotal:
              myGameStatus.currWord.id === myGameStatus.userAnswer.id ? 1 : 0,
            wrongAnswerTotal:
              myGameStatus.currWord.id !== myGameStatus.userAnswer.id ? 1 : 0,
            studiedAt: new Date().toISOString().substring(0, 10),
          })
        );
      }

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
  const handleUserAnswer = (answerWord: t.IWord) => {
    if (!userCanGiveAnswer()) {
      return;
    }
    if (!myGameStatus.currWord || !answerWord) {
      return;
    }

    setMyGameStatus((status) => {
      return {
        ...status,
        userAnswer: answerWord,
        showHiddenLetter: true,
      };
    });

    if (myGameStatus.currWord.id !== answerWord.id) {
      if (myGameStatus.sound) {
        playLoseGameSound();
      }
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
      if (!userCanGiveAnswer() || !myGameStatus.gameWords) {
        return;
      }
      if (['1', '2', '3'].includes(event.key)) {
        handleUserAnswer(myGameStatus.gameWords[Number(event.key) - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myGameStatus.gameWords, myGameStatus.currWord, userCanGiveAnswer]);

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
        onStartGame={handleStartGame}
      />
      {myGameStatus.newGame &&
        myGameStatus.currWord &&
        myGameStatus.hiddenWord &&
        myGameStatus.gameWords &&
        myGameStatus.gameWords.length && (
          <Grid
            alignItems="center"
            container
            justify="center"
            spacing={3}
            style={{ width: '100%', margin: 0 }}
          >
            <Grid item xs={12}>
              <p className="game-title">{GAME_TITLE}</p>
            </Grid>
            <Grid item xs={12}>
              <p className="game-round">{`Раунд ${
                myGameStatus.round + 1
              } из ${GAME_ROUNDS}`}</p>
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
            {myGameStatus.gameWords.map((gameWord, index) => (
              <Grid key={gameWord.id} item sm={4} xs={6}>
                <div className="centered-content-block">
                  <button
                    className={`answer-btn
                    ${!myGameStatus.userAnswer ? 'no-answer' : ''}
                    ${
                      myGameStatus.currWord &&
                      myGameStatus.userAnswer &&
                      gameWord.id === myGameStatus.currWord.id
                        ? 'right-answer'
                        : ''
                    }
                    ${
                      myGameStatus.currWord &&
                      myGameStatus.userAnswer &&
                      myGameStatus.userAnswer.id === gameWord.id &&
                      gameWord.id !== myGameStatus.currWord.id
                        ? 'wrong-answer'
                        : ''
                    }`}
                    onClick={() => handleUserAnswer(gameWord)}
                    type="button"
                  >
                    {`${index + 1}: ${gameWord.wordTranslate}`}
                  </button>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      {!myGameStatus.openStartGameModal &&
        !myGameStatus.newGame &&
        !myGameStatus.enoughWords && <div>Недостаточно слов для игры</div>}
    </div>
  );
}
