import {
  Container,
  GridList,
  GridListTile,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import CustomizedSnackbars from 'app/show-status/CustomizedSnackbars';
import TextBookPanel from 'app/text-book-panel/TextBookPanel';
import extractRouterParam from 'common/get-router-number-parameter';
import { useAppParams, useAppSelector, useCols } from 'common/hooks';
import LearningProgress from 'features/word-card/learning-progress/LearningProgress';
import WordCard from 'features/word-card/WordCard';
import {
  selectCorrectVsWrongByGroup,
  selectCorrectVsWrongByPage,
} from 'features/word-statistics/wordStatisticsSlice';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ISelectProps, IWord, IWordCountByPages } from 'types';
import { requestStatus, ROUTES, WORD_CARD_WIDTH } from '../../constants';
import styles from './styles';
import { selectWordsRequestStatus } from './wordsSlice';

interface Props extends WithStyles<typeof styles> {
  baseUrl: string;
  pageCount: number;
  // eslint-disable-next-line react/no-unused-prop-types
  showStats?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  wordCountByPages?: IWordCountByPages;
  words: Array<IWord>;
}

interface Chunks {
  [chunk: string]: Array<IWord>;
}

const WordGridList = (props: Props): JSX.Element => {
  const {
    baseUrl,
    classes,
    pageCount,
    showStats = false,
    wordCountByPages,
    words,
  } = props;
  const history = useHistory();
  const request = useAppSelector(selectWordsRequestStatus);

  const { group, page } = useAppParams();

  const selectProps: ISelectProps = {
    group: extractRouterParam(group, 0),
    page: extractRouterParam(page, 0),
  };
  const answerTotalByGroup = useAppSelector((state) =>
    selectCorrectVsWrongByGroup(state, selectProps)
  );
  const answerTotalByPage = useAppSelector((state) =>
    selectCorrectVsWrongByPage(state, selectProps)
  );

  useEffect(() => {
    if (request.status === requestStatus.fulfilled && !words.length)
      history.push(ROUTES.textbook.url);
  }, [words, history, request.status]);

  const [chunks, setChunks] = useState<Chunks>({});
  const [containerRef, cols] = useCols<HTMLDivElement>(WORD_CARD_WIDTH, words.length);

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
      {showStats && <LearningProgress answerTotal={answerTotalByGroup} />}
      <TextBookPanel
        baseUrl={baseUrl}
        pageCount={pageCount}
        wordCountByPages={wordCountByPages}
      />
      {showStats && <LearningProgress answerTotal={answerTotalByPage} />}
      <CustomizedSnackbars request={request} />
      <GridList cellHeight="auto" className={classes.gridList} cols={cols}>
        {Object.keys(Array(cols).fill(null)).map(
          (i) =>
            chunks[i] && (
              <GridListTile key={i} classes={{ tile: classes.tile }}>
                {chunks[i].map((word) => (
                  <WordCard key={word.id} word={word} />
                ))}
              </GridListTile>
            )
        )}
      </GridList>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(WordGridList);
