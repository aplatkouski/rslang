import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import clsx from 'clsx';
import { LocalLibrary, Games, EventNote, People } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

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
});

const upperMenu = [
  { key: 1, title: 'Учебник', url: '/sectors', icon: <LocalLibrary /> },
  { key: 2, title: 'Мини-игры', url: '', icon: <Games /> },
  { key: 3, title: 'Статистика', url: '/statistic', icon: <EventNote /> },
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
            <NavLink to={menuObj.url}>
              <ListItemText primary={menuObj.title} />
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
            <NavLink to={menuObj.url}>
              <ListItemText primary={menuObj.title} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer anchor="left" onClose={handleCloseSideMenu} open={open}>
      {list()}
    </Drawer>
  );
};

export default SideMenu;
