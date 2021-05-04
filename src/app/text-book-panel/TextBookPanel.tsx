import { Container, useTheme } from '@material-ui/core';
import {
  blue,
  cyan,
  green,
  indigo,
  lime,
  orange,
  purple,
  red,
  teal,
} from '@material-ui/core/colors';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { useAppParams } from 'common/hooks';
import Settings from 'features/settings/Settings';
import React from 'react';
import { IWordCountByPages } from 'types';
import Breadcrumbs from './breadcrumbs/Breadcrumbs';
import Burger from './burger/Burger';
import Paginator from './paginator/Paginator';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  baseUrl: string;
  pageCount: number;
  // eslint-disable-next-line react/no-unused-prop-types
  wordCountByPages?: IWordCountByPages;
}

const colors = [red, purple, indigo, blue, cyan, teal, green, lime, orange];

const TextBookPanel = (props: Props): JSX.Element => {
  const { classes, baseUrl, pageCount, wordCountByPages } = props;
  const { group } = useAppParams();
  const theme = useTheme();

  const color = {
    backgroundColor: colors[+group][theme.palette.type === 'light' ? 100 : 800],
  } as React.CSSProperties;

  return (
    <Container className={classes.textbookPanel} style={color}>
      <Burger />
      <Breadcrumbs />
      <Paginator
        baseUrl={baseUrl}
        pageCount={pageCount}
        wordCountByPages={wordCountByPages}
      />
      <Settings />
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(TextBookPanel);
