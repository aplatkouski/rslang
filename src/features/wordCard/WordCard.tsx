import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, useParams } from 'react-router-dom';
import { IWord, ISpecialSectionPageParams } from 'types';
import { updateWordOptions } from 'features/words/wordsSlice';
import { getCurrUser } from 'features/user/userSlice';
import { selectSettings } from 'features/settings/settingsSlice';
import { api, WORD_OPTIONAL_MODE, ROUTES } from '../../constants';
import { audioStart, audioStop } from './audio-helpers';
import FormattedText from './FormattedText';
import styles from './styles';

// с роутами словаря надо что то делать. Пока полная неразбериха
const DICTIONARY_STUDIED = '/studiedSection/:sector/:page/:color';

interface Props extends WithStyles<typeof styles> {
  word: IWord;
}

const WordCard = ({ classes, word }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

  const { translation, buttons } = useSelector(selectSettings);
  const { userId: isAuth } = useSelector(getCurrUser);

  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);

  const htmlAudioRef = useRef<HTMLAudioElement>(new Audio(undefined));

  // блок определения, где находится карточка. Уточнить после решения о роутах словаря
  const { path } = useRouteMatch();
  const isSectionsRoute = path === ROUTES.sections;
  const isDictionaryStudiedRoute = path === DICTIONARY_STUDIED;
  const { indicator } = useParams<ISpecialSectionPageParams>();
  const isDictionaryComplexRoute = indicator === 'hard';
  const isDictionaryDeletedRoute = indicator === 'del';

  const isComplex = word.optional?.mode === WORD_OPTIONAL_MODE.hard;

  useEffect(() => {
    return () => {
      audioStop(htmlAudioRef);
    };
  }, []);

  const audios: Array<string> = useMemo(
    () => [
      `${api}/${word.audio}`,
      `${api}/${word.audioExample}`,
      `${api}/${word.audioMeaning}`,
    ],
    [word]
  );

  const handleDelete = async (): Promise<void> => {
    setIsDisabledButton(true);
    await dispatch(
      updateWordOptions({
        wordId: word.id,
        options: { deleted: true },
      })
    );
    setIsDisabledButton(false);
  };

  const handleComplex = async (): Promise<void> => {
    setIsDisabledButton(true);
    await dispatch(
      updateWordOptions({
        wordId: word.id,
        options: {
          mode: isComplex ? WORD_OPTIONAL_MODE.studied : WORD_OPTIONAL_MODE.hard,
        },
      })
    );
    setIsDisabledButton(false);
  };

  const handleRestore = async (): Promise<void> => {
    setIsDisabledButton(true);
    if (isDictionaryComplexRoute) {
      await dispatch(
        updateWordOptions({
          wordId: word.id,
          options: { mode: WORD_OPTIONAL_MODE.studied },
        })
      );
    } else if (isDictionaryDeletedRoute) {
      await dispatch(
        updateWordOptions({
          wordId: word.id,
          options: { deleted: false },
        })
      );
    }
    setIsDisabledButton(false);
  };

  const handleAudio = (): void => {
    if (isAudioPlay) {
      audioStop(htmlAudioRef);
    } else {
      audioStart(htmlAudioRef, audios, setIsAudioPlay);
    }
    setIsAudioPlay((s) => !s);
  };

  return (
    <Card
      className={isComplex ? clsx(classes.root, classes.root__complex) : classes.root}
    >
      <CardMedia
        alt={`${word.word}`}
        className={classes.image}
        component="img"
        image={`${api}/${word.image}`}
        title={`${word.word}`}
      />

      <CardContent className={classes.content}>
        <Typography gutterBottom>
          <IconButton
            aria-label="play/pause"
            className={classes.audioButton}
            onClick={handleAudio}
          >
            {isAudioPlay ? (
              <StopIcon className={classes.audioIcon} />
            ) : (
              <PlayArrowIcon className={classes.audioIcon} />
            )}
          </IconButton>

          <span className={classes.word}>{word.word}</span>
          {' - '}
          {word.transcription}
          {translation && ` - ${word.wordTranslate}`}
        </Typography>

        <Typography>
          <FormattedText text={word.textExample} />
        </Typography>

        {translation && <Typography gutterBottom>{word.textExampleTranslate}</Typography>}

        <Typography>
          <FormattedText text={word.textMeaning} />
        </Typography>

        {translation && <Typography gutterBottom>{word.textMeaningTranslate}</Typography>}

        <Divider className={classes.divider} />
        <Typography>Статистика: нет данных пока...</Typography>
      </CardContent>

      <CardActions className={classes.buttonsGroup}>
        {buttons && isAuth && isSectionsRoute && (
          <>
            <Button
              className={classes.button}
              color="secondary"
              onClick={handleDelete}
              variant="outlined"
            >
              добавить в &quot;удаленные&quot;
            </Button>
            <Button
              className={classes.button}
              color="secondary"
              onClick={handleComplex}
              variant="outlined"
            >
              {isComplex ? 'удалить из "сложные"' : 'добавить в "сложные"'}
            </Button>
          </>
        )}

        {!isSectionsRoute && !isDictionaryStudiedRoute && (
          <Button
            className={classes.button}
            color="secondary"
            disabled={isDisabledButton}
            onClick={handleRestore}
            variant="outlined"
          >
            восстановить
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(WordCard);
