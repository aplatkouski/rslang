import { Box, DialogContent, Radio, WithStyles, withStyles } from '@material-ui/core';
import React, { useCallback, useState, useMemo } from 'react';
import GameResultsFirstPage from './GameResultsFirstPage';
import GameResultsSecondPage from './GameResultsSecondPage';
import { GameResult } from './types';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  results: GameResult;
}

type RadioName = 'page 1' | 'page 2';
const radios: Array<RadioName> = ['page 1', 'page 2'];

interface IPageData {
  radio: typeof radios[number];
  component: () => JSX.Element;
}

interface IGamesData {
  [gameId: string]: Array<IPageData>;
}

const MiniGameResults = ({ classes, results }: Props): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<RadioName>(radios[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as RadioName);
  };

  const gamesResults: IGamesData = useMemo(
    () => ({
      '606744ee4c1b2097c2d7491f': [
        {
          radio: radios[0],
          component: () => <GameResultsFirstPage results={results} />,
        },
        {
          radio: radios[1],
          component: () => <GameResultsSecondPage results={results} />,
        },
      ],
      '606744f84c1b2097c2d74920': [
        { radio: radios[0], component: () => <>Саванна...</> },
        {
          radio: radios[1],
          component: () => <GameResultsSecondPage results={results} />,
        },
      ],
      '606744ff4c1b2097c2d74921': [
        { radio: radios[0], component: () => <>Спринт...</> },
        {
          radio: radios[1],
          component: () => <GameResultsSecondPage results={results} />,
        },
      ],
      '606745084c1b2097c2d74922': [
        { radio: radios[0], component: () => <>Своя игра...</> },
        {
          radio: radios[1],
          component: () => <GameResultsSecondPage results={results} />,
        },
      ],
    }),
    [results]
  );

  const getRadioGroup = useCallback(
    (items: Array<IPageData>): Array<JSX.Element> =>
      items.map(({ radio }) => (
        <Radio
          key={radio}
          checked={selectedValue === radio}
          inputProps={{ 'aria-label': radio }}
          name="result-page-radio-button"
          onChange={handleChange}
          size="small"
          value={radio}
        />
      )),
    [selectedValue]
  );

  const getPage = useCallback(
    (items: Array<IPageData>): JSX.Element => {
      const item = items.find(({ radio }) => selectedValue === radio);
      return item?.component() || <>Нет данных...</>;
    },
    [selectedValue]
  );

  const gameID: string = '606744ee4c1b2097c2d7491f';
  const pagesData: Array<IPageData> = useMemo(() => gamesResults[gameID], [
    gamesResults,
    gameID,
  ]);

  return (
    <>
      <DialogContent className={classes.content}>{getPage(pagesData)}</DialogContent>
      {pagesData.length > 1 && (
        <Box className={classes.radioGroup}>{getRadioGroup(pagesData)}</Box>
      )}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(MiniGameResults);
