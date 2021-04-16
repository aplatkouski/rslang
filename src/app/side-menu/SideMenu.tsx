import { Divider, Drawer } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import {
  DeleteSweep as DeleteSweepIcon,
  Error as ErrorIcon,
  EventNote as EventNoteIcon,
  Games as GamesIcon,
  LocalLibrary as LocalLibraryIcon,
  MenuBook as MenuBookIcon,
  People as PeopleIcon,
} from '@material-ui/icons';
import { useAppSelector } from 'common/hooks';
import { selectAllGames } from 'features/games/gamesSlice';
import React from 'react';
import { ROUTES } from '../../constants';
import SideMenuList from './side-menu-list/SideMenuList';
import styles from './styles';
import { MenuListItem } from './types';

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
}

const upperMenu: Array<MenuListItem> = [
  { title: ROUTES.textbook.title, url: ROUTES.textbook.url, icon: <LocalLibraryIcon /> },
  {
    title: ROUTES.difficult.title,
    url: `${ROUTES.difficult.url}/0/0`,
    icon: <ErrorIcon />,
  },
  {
    title: ROUTES.studied.title,
    url: `${ROUTES.studied.url}/0/0`,
    icon: <MenuBookIcon />,
  },
  {
    title: ROUTES.deleted.title,
    url: `${ROUTES.deleted.url}/0/0`,
    icon: <DeleteSweepIcon />,
  },
  { title: ROUTES.statistics.title, url: ROUTES.statistics.url, icon: <EventNoteIcon /> },
];

const lowerMenu: Array<MenuListItem> = [
  { title: ROUTES.aboutTeam.title, url: ROUTES.aboutTeam.url, icon: <PeopleIcon /> },
];

const SideMenu = ({ open, onClose: handleClose, classes }: Props): JSX.Element => {
  const games = useAppSelector(selectAllGames);

  const gameMenu: Array<MenuListItem> = games.map((game) => ({
    title: game.name,
    url: `${ROUTES.games.url}/${game.id}`,
    icon: <GamesIcon />,
  }));

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={handleClose}
      open={open}
    >
      <div
        className={classes.list}
        onClick={handleClose}
        onKeyDown={handleClose}
        role="presentation"
      >
        <SideMenuList listItems={upperMenu} />
        <Divider />
        <SideMenuList listItems={gameMenu} />
        <Divider />
        <SideMenuList listItems={lowerMenu} />
      </div>
    </Drawer>
  );
};

export default withStyles(styles, { withTheme: true })(SideMenu);
