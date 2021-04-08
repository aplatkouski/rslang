import { LinearProgress, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
  value: number;
}
const LearningProgress = ({ classes, value }: IProps) => (
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
);

export default withStyles(styles, { withTheme: true })(memo(LearningProgress));
