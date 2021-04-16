import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ROUTES } from '../../constants';
import styles from './styles';

const breadcrumbNameMap: { [key: string]: string } = {
  main: 'Главная',
  games: 'Игры',
  textbook: 'Учебник',
  dictionary: 'Словарь',
  studied: 'Изучаемые слова',
  difficult: 'Сложные слова',
  deleted: 'Удаленные слова',
  statistic: 'Статистика',
  'about-team': 'О команде',
  ':group': 'Раздел',
  ':page': 'Страница',
};

const getPathName = (url: string, path: string): string => {
  const paramsPathName =
    path === ':group' || path === ':page'
      ? `${breadcrumbNameMap[path]} ${Number(url) + 1}`
      : `${breadcrumbNameMap[path]} ${url}`;

  return url === path ? breadcrumbNameMap[url] : paramsPathName;
};

interface Props extends WithStyles<typeof styles> {}

const Breadcrumbs = ({ classes }: Props): JSX.Element => {
  const { path, url } = useRouteMatch();

  const paths = path.split('/').filter((x) => x);
  const urls = url.split('/').filter((x) => x);

  const breadcrumbs = urls.map((pathname, idx) => {
    const to = `/${urls.slice(0, idx + 1).join('/')}`;
    const name = getPathName(pathname, paths[idx]);

    return idx === urls.length - 1 ? (
      <Typography key={to} className={classes.lastLink}>
        {name}
      </Typography>
    ) : (
      <Link key={to} className={classes.link} component={NavLink} to={to}>
        {name}
      </Link>
    );
  });

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" className={classes.root}>
      {urls.length === 0 ? (
        <Typography className={classes.lastLink}>{breadcrumbNameMap.main}</Typography>
      ) : (
        <Link className={classes.link} component={NavLink} to={ROUTES.main.url}>
          {breadcrumbNameMap.main}
        </Link>
      )}
      {breadcrumbs}
    </MuiBreadcrumbs>
  );
};

export default withStyles(styles, { withTheme: true })(Breadcrumbs);
