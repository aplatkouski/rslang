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
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../app/store';
import { IWord } from '../../types';
import FormattedText from './FormattedText';
import { audioStart, audioStop } from './audio-helpers';
import { api } from '../../constants';
import styles from './styles';

const SECTION = 'section';
const DICTIONARY_COMPLEX = 'dictionary/complex';
const DICTIONARY_DELETED = 'dictionary/deleted';

interface Props extends WithStyles<typeof styles> {
  data: IWord;
}

const WordCard = ({ classes, data: word }: Props): JSX.Element => {
  const { translation, buttons } = useSelector((s: RootState) => s.settings.value);
  const isAuth = useSelector((s: RootState) => s.user.userId);

  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);

  const htmlAudioRef = useRef<HTMLAudioElement>(new Audio(undefined));

  // получать и диспатчить в стор -----------------------------------------
  const [isComplex, setIsComplex] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  // ----------------------------------------------------------------------

  const { pathname } = useLocation();
  const isSectionRoute = pathname.includes(SECTION);
  const isDictionaryComplexRoute = pathname.includes(DICTIONARY_COMPLEX);
  const isDictionaryDeletedRoute = pathname.includes(DICTIONARY_DELETED);

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

  // диспатчить в стор ----------------------------------------------------
  const handleDelete = (): void => {
    setIsDeleted((s) => !s);
    console.log(isDeleted);
  };
  const handleComplex = (): void => {
    console.log(isComplex);
    setIsComplex((s) => !s);
  };
  const handleRestore = (): void => {
    if (isDictionaryComplexRoute) {
      console.log('restore complex');
    } else if (isDictionaryDeletedRoute) {
      console.log('restore deleted');
    }
  };
  // ----------------------------------------------------------------------

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

      <CardContent>
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
          {`${word.word} - ${word.transcription}`}
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
        <Divider />
        <Typography>Статистика: нет данных пока...</Typography>
      </CardContent>

      <CardActions className={classes.buttonsGroup}>
        {buttons && isAuth && isSectionRoute && (
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

        {!isSectionRoute && (
          <Button
            className={classes.button}
            color="secondary"
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
