import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  DeleteSweep,
  Error,
  EventNote,
  Games,
  LocalLibrary,
  MenuBook,
  People,
} from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../constants';

export type SideMenuProps = {
  open: boolean;
  handleCloseSideMenu: () => void;
};

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    backgroundColor: '#5A38FD',
  },
  menuTitle: {
    color: '#fff',
  },
});

const upperMenu = [
  { key: 1, title: 'Учебник', url: '/textbook', icon: <LocalLibrary /> },
  { key: 2, title: 'Мини-игры', url: '', icon: <Games /> },
  {
    key: 3,
    title: 'Удалённые',
    url: '/textbook/dictionary/deleted/0/0',
    icon: <DeleteSweep />,
  },
  {
    key: 4,
    title: 'Трудные',
    url: '/textbook/dictionary/difficult/0/0',
    icon: <Error />,
  },
  {
    key: 5,
    title: 'Изучаемые',
    url: '/textbook/dictionary/studied/0/0',
    icon: <MenuBook />,
  },
  {
    key: 6,
    title: 'Игра АудиоВызов',
    url: '/games/audio-call',
    icon: <MenuBook />,
  },
  {
    key: 7,
    title: 'Игра СвояИгра',
    url: '/games/my-game',
    icon: <MenuBook />,
  },
  { key: 8, title: 'Статистика', url: ROUTES.statistic, icon: <EventNote /> },
];

const lowerMenu = [{ key: 1, title: 'О команде', url: '/about-team', icon: <People /> }];

const SideMenu = ({ open, handleCloseSideMenu }: SideMenuProps): JSX.Element => {
  const classes = useStyles();

  const list = () => (
    <div
      className={clsx(classes.list)}
      onClick={handleCloseSideMenu}
      onKeyDown={handleCloseSideMenu}
      role="presentation"
    >
      <List>
        {upperMenu.map((menuObj) => (
          <ListItem key={menuObj.key} button>
            <NavLink to={menuObj.url}>
              <ListItemIcon>{menuObj.icon}</ListItemIcon>
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to={menuObj.url}>
              <ListItemText className={classes.menuTitle} primary={menuObj.title} />
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {lowerMenu.map((menuObj) => (
          <ListItem key={menuObj.key} button>
            <NavLink to={menuObj.url}>
              <ListItemIcon>{menuObj.icon}</ListItemIcon>
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to={menuObj.url}>
              <ListItemText className={classes.menuTitle} primary={menuObj.title} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={handleCloseSideMenu}
      open={open}
    >
      {list()}
    </Drawer>
  );
};

export default SideMenu;
