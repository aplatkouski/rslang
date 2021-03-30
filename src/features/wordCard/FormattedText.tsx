import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
  text: string;
}

const FormattedText = ({ classes, text }: IProps): JSX.Element => {
  const regexp = new RegExp('(<b>|<i>)(.*)(<[/]b>|<[/]i>)', 'i');
  const divided = text.split(regexp);

  const word = <span className={classes.word}>{divided[2]}</span>;

  return (
    <span>
      {divided[0]}
      {divided[1] === '<b>' ? <b>{word}</b> : <i>{word}</i>}
      {divided[4]}
    </span>
  );
};

export default withStyles(styles, { withTheme: true })(FormattedText);
