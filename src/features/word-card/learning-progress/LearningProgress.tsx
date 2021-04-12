import { LinearProgress, Tooltip, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import { useAppSelector } from '../../../common/hooks';
import { selectCorrectVsWrongByWordId } from '../../word-statistics/wordStatisticsSlice';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
  wordId: string;
}
const LearningProgress = ({ classes, wordId }: IProps) => {
  const {
    correctAnswerTotal: correct,
    wrongAnswerTotal: wrong,
  } = useAppSelector((state) => selectCorrectVsWrongByWordId(state, { wordId }));
  const value = correct + wrong ? Math.round((correct / (correct + wrong)) * 100) : 0;
  return (
    <Tooltip
      aria-label="learning progress"
      arrow
      title={correct + wrong ? `${correct} vs ${wrong}` : ''}
    >
      <LinearProgress
        classes={{
          determinate: classes.determinate,
          bar: classes.bar,
          colorPrimary: classes.colorPrimary,
        }}
        color="primary"
        value={value}
        variant="determinate"
      />
    </Tooltip>
  );
};

export default withStyles(styles, { withTheme: true })(memo(LearningProgress));
