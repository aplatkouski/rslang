import { Container } from '@material-ui/core';
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
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Burger from '../burger/Burger';
import Paginator from '../paginator/Paginator';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  baseUrl: string;
  pageCount: number;
  // eslint-disable-next-line react/require-default-props
  countDeletedWordByPages?: {
    [pag: string]: number;
  };
}

const colors = [red, purple, indigo, blue, cyan, teal, green, lime, orange];

const TextBookPanel = ({
  classes,
  baseUrl,
  pageCount,
  countDeletedWordByPages,
}: Props): JSX.Element => {
  const { group, page } = useAppParams();

  const color = {
    backgroundColor: colors[+group][50],
  } as React.CSSProperties;

  return (
    <Container className={classes.textbookPanel} style={color}>
      <Burger />
      <Breadcrumbs />
      <Paginator
        baseUrl={baseUrl}
        count={pageCount}
        countDeletedWordByPages={countDeletedWordByPages}
        group={+group}
        page={+page}
      />
      <Settings />
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(TextBookPanel);
