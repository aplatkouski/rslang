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
  { ...ROUTES.textbook, icon: <LocalLibraryIcon /> },
  { ...ROUTES.difficult, icon: <ErrorIcon /> },
  { ...ROUTES.studied, icon: <MenuBookIcon /> },
  { ...ROUTES.deleted, icon: <DeleteSweepIcon /> },
  { ...ROUTES.statistics, icon: <EventNoteIcon /> },
];

const lowerMenu: Array<MenuListItem> = [{ ...ROUTES.aboutTeam, icon: <PeopleIcon /> }];

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
