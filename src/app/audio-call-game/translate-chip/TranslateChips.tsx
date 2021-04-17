import { Avatar, Chip, withStyles, WithStyles } from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { choose, selectChoice } from 'features/games/gamesSlice';
import shuffle from 'features/words/utils/shuffle';
import React, { useCallback, useEffect, useState } from 'react';
import Hotkeys from 'react-hot-keys';
import { IWord } from 'types';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  wrongWords: Array<IWord>;
  correctWord: IWord;
}

const TranslateChips = ({ classes, wrongWords, correctWord }: Props): JSX.Element => {
  const [words, setWords] = useState<Array<IWord>>([]);
  const dispatch = useAppDispatch();
  const selectedWord = useAppSelector(selectChoice);
  const handleClick = useCallback(
    (word: IWord) => () => !selectedWord && dispatch(choose(word)),
    [dispatch, selectedWord]
  );

  useEffect(() => {
    setWords(shuffle([...wrongWords, correctWord]));
  }, [correctWord, wrongWords]);

  const getChipProps = (word: IWord, index: number) => {
    if (!selectedWord) {
      return {
        avatar: <Avatar>{index + 1}</Avatar>,
        onClick: handleClick(word),
      };
    }

    if (selectedWord === word) {
      if (selectedWord === correctWord) {
        return {
          avatar: <CheckCircle style={{ borderRadius: '50%' }} />,
          color: 'primary' as const,
        };
      }
      return {
        avatar: <Cancel style={{ borderRadius: '50%' }} />,
        color: 'secondary' as const,
      };
    }

    return {
      avatar: <Avatar>{index + 1}</Avatar>,
      disabled: true,
    };
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className={classes.root}>
      {words.map((word, index) => (
        <Hotkeys keyName={`${index + 1}`} onKeyDown={handleClick(word)}>
          <Chip
            className={classes.chip}
            classes={{
              avatar: classes.avatar,
            }}
            label={word.wordTranslate}
            size="medium"
            variant="outlined"
            {...getChipProps(word, index)}
          />
        </Hotkeys>
      ))}
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

export default withStyles(styles, { withTheme: true })(TranslateChips);
