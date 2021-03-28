import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
// import { useDispatch, useSelector } from 'react-redux';
import FormattedText from './FormattedText';
import styles from './styles';
// import {
//   decrement,
//   increment,
//   incrementAsync,
//   incrementByAmount,
//   selectCount,
// } from './wordCardSlice';

const URL = 'https://rs-lang-server.herokuapp.com/';

interface Props extends WithStyles<typeof styles> {
  error: Error | undefined;
  isLoading: boolean;
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

const word: IWord = {
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
};

const WordCard = ({ classes, error, isLoading }: Props): JSX.Element => {
  const [isComplex, setIsComplex] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const isTranslations = true;
  const isSettings = true;

  const handleDelete = (): void => {
    setIsDeleted((s) => !s);
  };
  const handleComplex = (): void => {
    setIsComplex((s) => !s);
  };

  if (error || isDeleted) {
    return (
      <Box className={classes.root}>
        <Typography component="p" variant="body2">
          No data
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className={classes.root}>
        <div>Loading...</div>
      </Box>
    );
  }

  const classList = isComplex ? clsx(classes.root, classes.root__complex) : classes.root;

  return (
    <Card className={classList}>
      <CardMedia
        alt={`${word.word}`}
        className={classes.image}
        component="img"
        image={`${URL}${word.image}`}
        title={`${word.word}`}
      />
      <CardContent>
        <Typography>
          {word.word}
          {' - '}
          {word.transcription}
          {isTranslations && ` - ${word.wordTranslate}`}
        </Typography>
        <Typography>
          <FormattedText text={word.textExample} />
        </Typography>
        {isTranslations && <Typography>{word.textExampleTranslate}</Typography>}
        <Typography>
          <FormattedText text={word.textMeaning} />
        </Typography>
        {isTranslations && <Typography>{word.textMeaningTranslate}</Typography>}
      </CardContent>
      {isSettings && (
        <CardActions>
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
        </CardActions>
      )}
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(WordCard);
