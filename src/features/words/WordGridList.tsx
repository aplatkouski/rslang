import {
  Container,
  GridList,
  GridListTile,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { useAppParams, useAppSelector, useCols } from 'common/hooks';
import WordCard from 'features/word-card/WordCard';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IUserWord, IWord } from 'types';
import Paginator from '../../app/paginator/Paginator';
import CustomizedSnackbars from '../../app/show-status/CustomizedSnackbars';
import { requestStatus, WORD_CARD_WIDTH } from '../../constants';
import Settings from '../settings/Settings';
import styles from './styles';
import { selectWordsRequestStatus } from './wordsSlice';

interface Props extends WithStyles<typeof styles> {
  baseUrl: string;
  words: Array<IWord>;
  userWords: Array<IUserWord>;
}

interface Chunks {
  [chunk: string]: Array<IWord>;
}

const WordGridList = ({ baseUrl, classes, userWords, words }: Props): JSX.Element => {
  const history = useHistory();
  const request = useAppSelector(selectWordsRequestStatus);

  useEffect(() => {
    if (request.status === requestStatus.fulfilled && !words.length)
      history.push('/textbook');
  }, [words, history, request.status]);

  const [chunks, setChunks] = useState<Chunks>({});
  const [containerRef, cols] = useCols<HTMLDivElement>(WORD_CARD_WIDTH, words.length);
  const { group, page } = useAppParams();

  useEffect(() => {
    const c: Chunks = {};
    words.forEach((word, index) => {
      if (c[index % cols]) {
        c[index % cols].push(word);
      } else {
        c[index % cols] = [word];
      }
    });
    setChunks(c);
  }, [words, cols]);

  return (
    <Container ref={containerRef} className={classes.root} maxWidth="lg">
      <CustomizedSnackbars request={request} />
      <Paginator baseUrl={baseUrl} count={30} group={+group} page={+page} />
      <div className={classes.settings}>
        <Settings />
      </div>
      <GridList cellHeight="auto" className={classes.gridList} cols={cols}>
        {Object.keys(Array(cols).fill(null)).map(
          (i) =>
            chunks[i] && (
              <GridListTile key={i} classes={{ tile: classes.tile }}>
                {chunks[i].map((word) => (
                  <WordCard
                    key={word.id}
                    userWord={userWords.find((userWord) => userWord.wordId === word.id)}
                    word={word}
                  />
                ))}
              </GridListTile>
            )
        )}
      </GridList>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(WordGridList);
