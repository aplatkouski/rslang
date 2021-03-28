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
import FormattedText from './FormattedText';
import { audioStart, audioStop } from './audio-helpers';
import { API } from '../../constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  // id: string;
}

interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

const WordCard = ({ classes }: Props): JSX.Element => {
  const { translation, buttons } = useSelector((s: RootState) => s.settings.value);

  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);

  const htmlAudioRef = useRef<HTMLAudioElement>(new Audio(undefined));

  // получать и диспатчить в стор -----------------------------------------
  const [isComplex, setIsComplex] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const isAuth = true;
  // ----------------------------------------------------------------------

  const { pathname } = useLocation();
  const isSectionRoot = pathname.includes('section');
  const isDictionaryComplexRoot = pathname.includes('dictionary/complex');
  const isDictionaryDeletedRoot = pathname.includes('dictionary/deleted');

  useEffect(() => {
    return () => {
      audioStop(htmlAudioRef);
    };
  }, []);

  const word: IWord = useMemo(
    () => ({
      id: '5e9f5ee35eb9e72bc21af4ac',
      group: 0,
      page: 0,
      word: 'month',
      image: 'files/01_0014.jpg',
      audio: 'files/01_0014.mp3',
      audioMeaning: 'files/01_0014_meaning.mp3',
      audioExample: 'files/01_0014_example.mp3',
      textMeaning: 'A <i>month</i> is one of 12 periods of time in one year.',
      textExample: 'January is the first <b>month</b> of the year.',
      transcription: '[mʌnθ]',
      textExampleTranslate: 'Январь - первый месяц года',
      textMeaningTranslate: 'Месяц - это один из 12 периодов времени в году',
      wordTranslate: 'месяц',
    }),
    []
  );

  const audios: Array<string> = useMemo(
    () => [
      `${API}/${word.audio}`,
      `${API}/${word.audioExample}`,
      `${API}/${word.audioMeaning}`,
    ],
    [word]
  );

  // диспатчить в стор ----------------------------------------------------
  const handleDelete = (): void => {
    setIsDeleted((s) => !s);
    console.log(isDeleted);
  };
  const handleComplex = (): void => {
    setIsComplex((s) => !s);
  };
  const handleRestore = (): void => {
    if (isDictionaryComplexRoot) {
      console.log('restore complex');
    } else if (isDictionaryDeletedRoot) {
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
        image={`${API}/${word.image}`}
        title={`${word.word}`}
      />

      <CardContent>
        <Typography>
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
        {translation && <Typography>{word.textExampleTranslate}</Typography>}
        <Typography>
          <FormattedText text={word.textMeaning} />
        </Typography>
        {translation && <Typography>{word.textMeaningTranslate}</Typography>}
        <Divider />
        <Typography>Статистика: нет данных пока...</Typography>
      </CardContent>

      <CardActions>
        {buttons && isAuth && isSectionRoot && (
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

        {!isSectionRoot && (
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
