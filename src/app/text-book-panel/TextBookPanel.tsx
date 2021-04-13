import { Container } from '@material-ui/core';
import {
  red,
  purple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  lime,
  orange,
} from '@material-ui/core/colors';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { useAppParams } from '../../common/hooks';
import Settings from '../../features/settings/Settings';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import Burger from '../burger/Burger';
import Paginator from '../paginator/Paginator';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  baseUrl: string;
  pageCount: number;
}

const colors = [red, purple, indigo, blue, cyan, teal, green, lime, orange];

const TextBookPanel = ({ classes, baseUrl, pageCount }: Props): JSX.Element => {
  const { group, page } = useAppParams();

  const color = {
    'background-color': colors[+group][50],
  } as React.CSSProperties;

  return (
    <Container className={classes.textbookPanel} style={color}>
      <Burger />
      <Breadcrumbs />
      <Paginator baseUrl={baseUrl} count={pageCount} group={+group} page={+page} />
      <Settings />
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(TextBookPanel);
