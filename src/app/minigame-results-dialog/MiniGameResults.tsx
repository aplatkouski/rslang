import { Box, DialogContent, Radio, WithStyles, withStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import GameResultsFirstPage from './GameResultsFirstPage';
import GameResultsSecondPage from './GameResultsSecondPage';
import styles from './styles';

type RadioName = 'page 1' | 'page 2';
const radios: Array<RadioName> = ['page 1', 'page 2'];

interface IMapPageToRadio {
  radio: typeof radios[number];
  component: JSX.Element;
}

const mapPageToRadio: Array<IMapPageToRadio> = [
  { radio: radios[0], component: <GameResultsFirstPage /> },
  { radio: radios[1], component: <GameResultsSecondPage /> },
];

interface Props extends WithStyles<typeof styles> {}

const MiniGameResults = ({ classes }: Props): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<RadioName>(radios[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value as RadioName);
  };

  const getRadioGroup = useCallback(
    (items: Array<IMapPageToRadio>): Array<JSX.Element> =>
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
    (items: Array<IMapPageToRadio>) => {
      const item = items.find(({ radio }) => selectedValue === radio);
      return item?.component;
    },
    [selectedValue]
  );

  return (
    <>
      <DialogContent className={classes.content}>{getPage(mapPageToRadio)}</DialogContent>

      {mapPageToRadio.length > 1 && (
        <Box className={classes.radioGroup}>{getRadioGroup(mapPageToRadio)}</Box>
      )}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(MiniGameResults);
