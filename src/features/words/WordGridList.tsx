import {
  Container,
  GridList,
  GridListTile,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import extractRouterParam from 'common/get-router-number-parameter';
import { useAppSelector, useCols } from 'common/hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IRouterPath, IWord } from 'types';
import { WORD_CARD_WIDTH } from '../../constants';
import { selectUserWordsByPage } from '../user-words/userWordsSlice';
import WordCard from '../word-card/WordCard';
import styles from './styles';
import { selectWordsByPage } from './wordsAPSlice';

type Props = WithStyles<typeof styles>;

interface Chunks {
  [chunk: string]: Array<IWord>;
}

const WordGridList = ({ classes }: Props): JSX.Element => {
  const [chunks, setChunks] = useState<Chunks>({});
  const { group, page } = useParams<IRouterPath>();
  const selectProps = {
    group: extractRouterParam(group, 0),
    page: extractRouterParam(page, 0),
  };

  const words = useAppSelector((state) => selectWordsByPage(state, selectProps));
  const [containerRef, cols] = useCols<HTMLDivElement>(WORD_CARD_WIDTH, words.length);
  const userWords = useAppSelector((state) => selectUserWordsByPage(state, selectProps));

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
      <GridList cellHeight="auto" className={classes.gridList} cols={cols}>
        {Object.keys(Array(cols).fill(null)).map(
          (i) =>
            chunks[i] && (
              // because all tiles have the same width, we check only first
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
