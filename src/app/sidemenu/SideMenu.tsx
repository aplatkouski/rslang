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
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../common/hooks';

import { ROUTES } from '../../constants';
import { selectAllGames } from '../../features/games/gamesSlice';

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
  { title: 'Учебник', url: '/textbook', icon: <LocalLibrary /> },
  { title: 'Мини-игры', url: '', icon: <Games /> },
  {
    title: 'Удалённые',
    url: '/textbook/dictionary/deleted/0/0',
    icon: <DeleteSweep />,
  },
  {
    title: 'Трудные',
    url: '/textbook/dictionary/difficult/0/0',
    icon: <Error />,
  },
  {
    title: 'Изучаемые',
    url: '/textbook/dictionary/studied/0/0',
    icon: <MenuBook />,
  },
  { title: 'Статистика', url: ROUTES.statistic, icon: <EventNote /> },
];

const lowerMenu = [{ title: 'О команде', url: '/about-team', icon: <People /> }];

const SideMenu = ({ open, handleCloseSideMenu }: SideMenuProps): JSX.Element => {
  const classes = useStyles();
  const games = useAppSelector(selectAllGames);

  const gameMenu = games.map((game) => ({
    title: game.name,
    url: `/games/${game.id}`,
    icon: <MenuBook />,
  }));

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={handleCloseSideMenu}
      open={open}
    >
      <div
        className={classes.list}
        onClick={handleCloseSideMenu}
        onKeyDown={handleCloseSideMenu}
        role="presentation"
      >
        <List>
          {[...upperMenu, ...gameMenu].map((menuObj) => (
            <ListItem key={menuObj.title} button>
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
            <ListItem key={menuObj.title} button>
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
    </Drawer>
  );
};

export default SideMenu;
