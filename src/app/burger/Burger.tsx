import { WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { NavLink } from 'react-router-dom';
import { GAMES, ROUTES } from '../../constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const burgerItems = [
  { route: ROUTES.savanna, title: GAMES.savanna },
  { route: ROUTES.sprint, title: GAMES.sprint },
  { route: ROUTES.audio_call, title: GAMES.audioCall },
  { route: ROUTES.custom_game, title: GAMES.ownGame },
  { route: ROUTES.statistics, title: 'Статистика' },
];

const Burger = ({ classes }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Игры">
        <IconButton
          aria-controls="long-menu"
          aria-haspopup="true"
          aria-label="more"
          className={classes.button}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="simple-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        {burgerItems.map(({ route, title }) => (
          <MenuItem onClick={handleClose}>
            <NavLink to={route}>{title}</NavLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Burger);
