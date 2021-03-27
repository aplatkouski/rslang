import { Box, Typography, withStyles, WithStyles } from '@material-ui/core';
import React from 'react';
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
  textExampleTranslate: 'январь - первый месяц года',
  textMeaningTranslate: 'Месяц - это один из 12 периодов времени в году',
  wordTranslate: 'месяц',
};

const WordCard = ({ classes, error, isLoading }: Props): JSX.Element => {
  if (error) {
    return (
      <Box className={classes.root}>
        <Typography component="p" variant="body2">
          No data
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box className={classes.wordImage}>
            <img
              alt={`${word.word}`}
              className={classes.image}
              src={`${URL}${word.image}`}
            />
          </Box>
          <Typography>{`${word.word} - ${word.transcription} - ${word.wordTranslate}`}</Typography>
          <Typography>
            <FormattedText text={word.textExample} />
          </Typography>
          <Typography>{word.textExampleTranslate}</Typography>
          <Typography>
            <FormattedText text={word.textMeaning} />
          </Typography>
          <Typography>{word.textMeaningTranslate}</Typography>
        </>
      )}
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(WordCard);
